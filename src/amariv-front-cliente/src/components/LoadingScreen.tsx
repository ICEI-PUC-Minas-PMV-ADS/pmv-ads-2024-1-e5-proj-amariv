import { CircularProgress } from "@mui/material";

function LoadingScreen({ open }: { open: boolean }) {
  return (
    <>
      {
        open &&
        <div className="w-full h-screen bg-[rgb(0,0,0,0.6)] flex items-center justify-center z-50 fixed">
          <CircularProgress
            size={40}
            sx={
              {
                color: "#CADDA8"
              }
            } />
        </div>
      }
    </>

  );
}

export default LoadingScreen;