import { useRef, RefObject, } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import CheckIconComp from '@/app/_Components/MicroComps/CheckCircleIcon/CheckCircleIcon';

interface ResponseDialogProps {
  open: boolean;
  title: string;
  message: string;
  buttonText: string;
  onConfirm: () => void;

}

function PaperComponent(props: PaperProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <Draggable
      nodeRef={nodeRef as RefObject<HTMLDivElement>}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

export default function ResponseDialog({ open, title, message, buttonText, onConfirm }: ResponseDialogProps) {


  return (
    <>
        <Dialog
          open={open}
          onClose={onConfirm}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          sx={{
              backgroundColor: '#EFE4D2',
              color: '#fff',
              backgroundImage:'url("/images/reponsesImages/modalLoginResponseBackground.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
          }}
          slotProps={{
            paper:{
              sx: {
                  minHeight: '25vh',
                  minWidth: '25vw',
                  borderRadius:'50px',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'space-evenly',
                  backgroundColor:'#F8F3D9'
              },
            }
          }}
    
        >
          <DialogTitle style={{ cursor: 'move', display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem' }} 
          id="draggable-dialog-title">
          <CheckIconComp />
            {title}
          </DialogTitle>
          <DialogContent>
              <DialogContentText>
                  {message}
              </DialogContentText>
          </DialogContent>
          <DialogActions sx={{display:'flex', justifyContent:'space-evenly', width:'100%'}}>
            <Button  onClick={onConfirm} color='error' sx={{color:'#FFFBDE' ,backgroundColor:'#FE4F2D', transition:'0.7s all ease-in-out'
            ,'&:hover': {
                  backgroundColor: '#E50046', 
                  padding: ' .5rem 1rem',
                  },}}>
              Close 
            </Button>
            <Button  onClick={onConfirm} sx={{color  :`#FFFBDE`, backgroundColor:'#CA7842', transition:'0.7s all ease-in-out'
            ,'&:hover': {
                  backgroundColor: '#FFA725', 
                  padding: ' .5rem 1rem',
                  },}}
                  >{buttonText}</Button>
          </DialogActions>
        </Dialog>
    </>
  );
}
