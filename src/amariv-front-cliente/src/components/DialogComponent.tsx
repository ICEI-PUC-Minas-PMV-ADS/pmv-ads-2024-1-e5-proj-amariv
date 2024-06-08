import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog } from "@mui/material";


type props = {
  open: boolean,
  onClose: () => void
  onAccept: () => void
  text?: string
  title?: string
  alert: boolean
}

function DialogComponent({ open, onClose, onAccept, text, title, alert = false }: props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {
        (title != "" || title != undefined) &&
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
      }
      {
        (text != "" || text != undefined) &&
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
      }

      <DialogActions>
        <Button onClick={onClose}>{alert == true ? "Ok" : "Cancelar"}</Button>
        {
          alert == false &&
          <Button onClick={onAccept} autoFocus>
            Confirmar
          </Button>
        }
      </DialogActions>
    </Dialog>
  );
}

export default DialogComponent;