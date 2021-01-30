import React, { useContext } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { StoreFrontContext } from "./../hardhat/SymfoniContext";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  })
);

export default function SimpleModal() {
  const classes = useStyles();
  const storefront = useContext(StoreFrontContext);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [shoeName, setShoeName] = React.useState("");
  const [size, setSize] = React.useState(0);
  const [price, setPrice] = React.useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(shoeName, size, price);
    if (!storefront.instance) throw Error("Storefront instance not ready");
    if (storefront.instance) {
      setSize(size * 2);
      const tx = await storefront.instance.createToken(shoeName, price, size);
      console.log("post tx", tx);
      await tx.wait();
      window.location.reload();
    }
  };

  const handleShoeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShoeName(event.currentTarget.value);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSize(+event.currentTarget.value);
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrice(+event.currentTarget.value);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <TextField id="shoename" name="shoename" label="Shoe Name" fullWidth onChange={handleShoeChange} required />
        <TextField id="size" label="Shoe Size(US)" fullWidth type="number" onChange={handleSizeChange} required />
        <TextField id="price" label="Price" fullWidth type="number" onChange={handlePriceChange} required />
        <Button type="submit" variant="outlined" style={{ marginTop: "20px", marginLeft: "auto", marginRight: "auto", display: "block" }}>
          {" "}
          Post{" "}
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        {" "}
        POST{" "}
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </div>
  );
}
