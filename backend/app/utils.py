import numpy as np
import json
import httpx

USER_MAPPING_FILE = "shared_files/user_mappings.json"
RESOURCE_MAPPING_FILE = "shared_files/resource_mappings.json" 
USER_MATRIX_FILE = "shared_files/user_matrix.npy"
RESOURCE_MATRIX_FILE = "shared_files/resource_matrix.npy"
LEARNING_RATE = 0.001
REGULARIZATION = 0.001
LATENT_DIM = 3
num_epochs = 1000
try:
    user_matrix = np.load(USER_MATRIX_FILE)
    resource_matrix = np.load(RESOURCE_MATRIX_FILE)
except FileNotFoundError:
    print("ERROR FILES OF MATRICES NOT FOUND...")
    
def load_json(file_path):
    try:
        with open(file_path, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

user_mappings = load_json(USER_MAPPING_FILE)
resource_mappings = load_json(RESOURCE_MAPPING_FILE)

# Function to save mappings
def save_json(file_path, data):
    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)

# function to reload files
async def reload_files():
    api_url = "https://localhost:8080/api/reload_files"
    async with httpx.AsyncClient() as client:
        await client.get(api_url)
        

# ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# function to add dummy embedding for new user
def add_new_user():
    global user_matrix 
    new_embedding = np.random.normal(0, 0.1, (1, LATENT_DIM))
    user_matrix = np.vstack([user_matrix, new_embedding])
    np.save(USER_MATRIX_FILE, user_matrix)
    return user_matrix.shape[0] - 1 

# function to add dummy embedding for new resource
def add_new_resource():
    global resource_matrix
    new_embedding = np.random.normal(0, 0.1, (1, LATENT_DIM))
    resource_matrix = np.vstack([resource_matrix, new_embedding])
    np.save(RESOURCE_MATRIX_FILE, resource_matrix)
    return resource_matrix.shape[0] - 1

# Function to update user mappings
def update_user_mapping(new_user_id):
    if new_user_id not in user_mappings:
        user_mappings[new_user_id] = len(user_mappings) + 1  # Assign new index
        save_json(USER_MAPPING_FILE, user_mappings)
        add_new_user() # adding new row in user_matrix 
        reload_files() # reload files
        print(f"Updated user mapping: {new_user_id} -> {user_mappings[new_user_id]}")

# Function to update resource mappings
def update_resource_mapping(new_resource_id):
    if new_resource_id not in resource_mappings:
        resource_mappings[len(resource_mappings)] = new_resource_id
        save_json(RESOURCE_MAPPING_FILE, resource_mappings)
        add_new_resource()
        reload_files() # reload files
        print(f"Updated resource mapping: {len(resource_mappings) - 1} -> {new_resource_id}")

# function to delete user mapping
def delete_user_mapping(user_id):
    user_matrix = np.load(USER_MATRIX_FILE)
    user_mappings = load_json(USER_MAPPING_FILE)
    if user_id not in user_mappings:
        print(f"User {user_id} not found in mappings.")
        return
    user_index = user_mappings[user_id]
    user_matrix = np.delete(user_matrix, user_index, axis=0)
    del user_mappings[user_id]

    for uid, idx in user_mappings.items():
        if idx > user_index:
            user_mappings[uid] -= 1  
    np.save(USER_MATRIX_FILE, user_matrix)
    save_json(USER_MAPPING_FILE, user_mappings)
    reload_files() # reload files
    print(f"Deleted user {user_id} and updated mappings.")

# function to delete resource mapping
def delete_resource_mapping(resource_id):
    """
    Deletes a resource from the resource matrix and updates mappings accordingly.
    """
    # Load resource matrix and mappings
    resource_matrix = np.load(RESOURCE_MATRIX_FILE)
    resource_mappings = load_json(RESOURCE_MAPPING_FILE)

    # Find the index of the resource to be removed
    resource_index = None
    for idx, res_id in resource_mappings.items():
        if res_id == resource_id:
            resource_index = int(idx)
            break

    if resource_index is None:
        print(f"Resource {resource_id} not found in mappings.")
        return

    # Remove the resource row from the matrix
    resource_matrix = np.delete(resource_matrix, resource_index, axis=0)

    # Remove resource from mapping and shift remaining indices
    del resource_mappings[str(resource_index)]

    new_mappings = {}
    for idx, res_id in resource_mappings.items():
        new_idx = int(idx)
        if new_idx > resource_index:
            new_idx -= 1  # Shift indices
        new_mappings[str(new_idx)] = res_id

    # Save the updated matrix and mappings
    np.save(RESOURCE_MATRIX_FILE, resource_matrix)
    save_json(RESOURCE_MAPPING_FILE, new_mappings)
    reload_files() # reload files
    print(f"Deleted resource {resource_id} and updated mappings.")

# Function to handle new interactions
def process_new_interaction(interaction):
    user_id = interaction["user_id"]
    resource_id = interaction["resource_id"]
    type = interaction["interactionType"]
    if type == "reviewed":
        rating = 3.0
    elif type == "like":
        rating = 2.0
    rating = 1.0

    if user_id not in user_mappings or resource_id not in resource_mappings.values():
        print("Skipping interaction: User or resource not found in mappings.")
        return

    user_index = user_mappings[user_id]
    resource_index = list(resource_mappings.keys())[list(resource_mappings.values()).index(resource_id)]

    print(f"Processing new interaction: User {user_index}, Resource {resource_index}, Rating {rating}")
    
    # Incrementally update the matrix factorization model
    update_matrix_factorization(user_index, resource_index, rating)

    # reload files
    reload_files()

# function to re-train model
def update_matrix_factorization(user_index, resource_index, rating):
    print(f"Updating matrix factorization for user {user_index}, resource {resource_index}, rating {rating}")
    user_vec = user_matrix[user_index]
    resource_vec = resource_matrix[resource_index]

    # Compute prediction
    prediction = np.dot(user_vec, resource_vec)
    error = rating - prediction  # Compute the error
    for epoch in range(num_epochs):
                    predicted = np.dot(user_matrix,resource_matrix.T)
                    error = rating - predicted
                    user_matrix[user_index] += LEARNING_RATE * (error * resource_vec - REGULARIZATION * user_vec)
                    resource_matrix[resource_index] += LEARNING_RATE * (error * user_vec - REGULARIZATION * resource_vec)

    # Save updates
    np.save(USER_MATRIX_FILE, user_matrix)
    np.save(RESOURCE_MATRIX_FILE, resource_matrix)
    print(f"Updated matrices for user {user_index} and resource {resource_index}")