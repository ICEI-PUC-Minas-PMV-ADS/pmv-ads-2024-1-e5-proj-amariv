import { CircularProgress } from "@mui/material";

function LoadingScreen({ open }: { open: boolean }) {
  return (
    <>
      {
        open &&
        <div className="w-full h-full min-h-screen bg-[rgb(0,0,0,0.4)] flex items-center justify-center z-50">
          <CircularProgress
            size={40}
            sx={
              {
                color: "#53735B"
              }
            } />
        </div>
      }
    </>

  );
}

export default LoadingScreen;