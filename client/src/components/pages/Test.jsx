// import React, { useState } from 'react';
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   TouchSensor,
// } from '@dnd-kit/core';
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   rectSortingStrategy,
// } from '@dnd-kit/sortable';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';


// const SortableItem = ({ id, children }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({ id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     padding: '10px',
//     margin: '5px 0',
//     background: '#f0f0f0',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     cursor: 'grab',
//     touchAction: 'none',
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       {children}
//     </div>
//   );
// };

// const initialData = {
//   column1: ['Item 1', 'Item 2', 'Item 3'],
//   column2: ['Item 4', 'Item 5'],
//   column3: ['Item 6', 'Item 7', 'Item 8'],
// };

// const DragDropColumns = () => {
//   const [columns, setColumns] = useState(initialData);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(TouchSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (!over) return;

//     const [fromColumn, fromIndex] = active.id.split(':');
//     const [toColumn, toIndex] = over.id.split(':');

//     if (fromColumn === toColumn) {
//       // Moving within the same column
//       const newColumnItems = arrayMove(
//         columns[fromColumn],
//         parseInt(fromIndex),
//         parseInt(toIndex)
//       );
//       setColumns({
//         ...columns,
//         [fromColumn]: newColumnItems,
//       });
//     } else {
//       // Moving between columns
//       const fromItems = [...columns[fromColumn]];
//       const toItems = [...columns[toColumn]];
//       const [movedItem] = fromItems.splice(parseInt(fromIndex), 1);
//       toItems.splice(parseInt(toIndex), 0, movedItem);

//       setColumns({
//         ...columns,
//         [fromColumn]: fromItems,
//         [toColumn]: toItems,
//       });
//     }
//   };

//   return (
//     <DndContext
//       sensors={sensors}
//       collisionDetection={closestCenter}
//       onDragEnd={handleDragEnd}
//     >
//       <div style={{ display: 'flex', gap: '20px' }}>
//         {Object.keys(columns).map((column) => (
//           <SortableContext
//             key={column}
//             items={columns[column].map((_, index) => `${column}:${index}`)}
//             strategy={rectSortingStrategy}
//           >
//             <div
//               style={{
//                 border: '1px solid #ccc',
//                 borderRadius: '4px',
//                 padding: '10px',
//                 width: '200px',
//               }}
//             >
//               <h4>{column}</h4>
//               {columns[column].map((item, index) => (
//                 <SortableItem
//                   key={`${column}:${index}`}
//                   id={`${column}:${index}`}
//                 >
//                   {item}
//                 </SortableItem>
//               ))}
//             </div>
//           </SortableContext>
//         ))}
//       </div>
//     </DndContext>
//   );
// };

// export default DragDropColumns;


import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import { FC } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";



const Card = ({ id, title }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id
  });

  const style = {
    margin: "10px",
    opacity: 1,
    color: "#333",
    background: "white",
    padding: "10px",
    transform: CSS.Transform.toString(transform)
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div id={id}>
        <p>{title}</p>
      </div>
    </div>
  );
};


const Column = ({ id, title, cards }) => {
  const { setNodeRef } = useDroppable({ id: id });
  return (
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <div
        ref={setNodeRef}
        style={{
          width: "200px",
          background: "rgba(245,247,249,1.00)",
          marginRight: "10px"
        }}
      >
        <p
          style={{
            padding: "5px 20px",
            textAlign: "left",
            fontWeight: "500",
            color: "#575757"
          }}
        >
          {title}
        </p>
        {cards.map((card) => (
          <Card key={card.id} id={card.id} title={card.title}></Card>
        ))}
      </div>
    </SortableContext>
  );
};


export default function Test() {
  const data = [
    {
      id: "Column1",
      title: "Column1",
      cards: [
        {
          id: "Card1",
          title: "Card1"
        },
        {
          id: "Card2",
          title: "Card2"
        }
      ]
    },
    {
      id: "Column2",
      title: "Column2",
      cards: [
        {
          id: "Card3",
          title: "Card3"
        },
        {
          id: "Card4",
          title: "Card4"
        }
      ]
    }
  ];
  const [columns, setColumns] = useState(data);

  const findColumn = (unique) => {
    if (!unique) {
      return null;
    }
    if (columns.some((c) => c.id === unique)) {
      return columns.find((c) => c.id === unique) ?? null;
    }
    const id = String(unique);
    const itemWithColumnId = columns.flatMap((c) => {
      const columnId = c.id;
      return c.cards.map((i) => ({ itemId: i.id, columnId: columnId }));
    });
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return columns.find((c) => c.id === columnId) ?? null;
  };

  const handleDragOver = (event) => {
    const { active, over, delta } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }
    setColumns((prevState) => {
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter((i) => i.id !== activeId);
          return c;
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length)
          ];
          return c;
        } else {
          return c;
        }
      });
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }
    const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
    const overIndex = overColumn.cards.findIndex((i) => i.id === overId);
    if (activeIndex !== overIndex) {
      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.cards = arrayMove(overColumn.cards, activeIndex, overIndex);
            return column;
          } else {
            return column;
          }
        });
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div
        className="App"
        style={{ display: "flex", flexDirection: "row", padding: "20px" }}
      >
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            cards={column.cards}
          ></Column>
        ))}
      </div>
    </DndContext>
  );
}