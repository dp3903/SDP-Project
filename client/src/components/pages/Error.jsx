import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { ChevronLeft, SeparatorVertical } from 'lucide-react';
import { Separator } from '../ui/separator';

const ErrorPage = ({ errorCode = "Unknown", errorMessage = "An unexpected error occurred.", redirect = -1}) => {
  const navigate = useNavigate();
  
  const location = useLocation();
  const error  = location.state==null ? null : location.state.error;
  if(error != null){ 
    console.log(error)
    errorCode = error.status;
    errorMessage = error.message;
    redirect = error.redirect || -1
  }

  const handleGoBack = () => {
    // Navigate back to the previous page
    navigate(redirect);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black p-6 pt-20">
      <div className="border-1 shadow-md rounded-md p-8 max-w-md w-full">
        <div className="flex flex-row mb-10">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Error {errorCode}
          </h1>
          <Separator orientation="vertical" className="ml-4 mr-4 h-10" />
          <p className="text-lg text-white mb-8">
            {errorMessage}
          </p>
        </div>
        <Button 
          onClick={handleGoBack}
          variant="secondary"
        >
          <ChevronLeft />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;