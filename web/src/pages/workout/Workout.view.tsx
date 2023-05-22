import { Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Drawer,
  DrawerProps,
  TextField,
  Typography,
} from "@mui/material";
import { FloatButton } from "components/FloatButton/FloatButton";
import {
  Exercise,
  FirestoreCollections,
  db,
  firestore,
} from "firebase-sdk/firestore";
import Main from "layout/Main";
import { useAuth } from "mods/context/auth";
import { ChangeEvent, useEffect, useState } from "react";

export default function Workout() {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = useSubdata();

  return (
    <>
      <Main>
        <Typography>Hello world</Typography>
      </Main>

      <ul>
        {data.map(({ title, id }) => {
          return <li key={id!}>{title}</li>;
        })}
      </ul>

      <FloatButton onClick={() => setOpen(() => true)}>
        <Add />
      </FloatButton>

      <NewWorkoutDrawer open={open} onClose={() => setOpen(() => false)} />
    </>
  );
}

function useSubdata() {
  const [data, setData] = useState<Exercise[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const col = firestore.collection(db, FirestoreCollections.exercises);
    const where = firestore.where("userID", "==", user.uid);
    const q = firestore.query(col, where);

    const unsubscribe = firestore.onSnapshot(q, (docs) => {
      const buf: Exercise[] = [];
      docs.forEach((doc) => {
        const { desc, title } = doc.data();
        buf.push({ id: doc.id, desc, title, userID: user.uid });
      });

      setData(() => buf);
    });

    return unsubscribe;
  }, []);

  useEffect(() => console.log(data), [data]);

  return { data };
}

interface NewWorkoutDrawerProps extends DrawerProps {}
function NewWorkoutDrawer(props: NewWorkoutDrawerProps) {
  const { onClose, ...rest } = props;

  const { title, onTitle, desc, onDesc, handleSubmit, loading, error } =
    useNewExercise(onClose as () => void);

  return (
    <Drawer {...rest} anchor="right" onClose={onClose}>
      <Box component="section" padding={5} width="100vw" height="100vh">
        <Typography
          component="h1"
          fontWeight={600}
          fontSize="1.3rem"
          color="primary"
          mb={4}
        >
          new exercise.
        </Typography>

        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={2}
          onSubmit={handleSubmit}
        >
          <TextField
            type="text"
            label="title."
            fullWidth
            required
            value={title}
            onChange={onTitle}
          />
          <TextField
            type="text"
            label="description."
            fullWidth
            required
            value={desc}
            onChange={onDesc}
          />

          <LoadingButton
            variant="contained"
            loading={loading}
            sx={{ width: "max-content", marginX: "auto" }}
            type="submit"
          >
            submit
          </LoadingButton>
        </Box>

        <Box width="100%" display="flex" justifyContent="center" mt="0.4rem">
          <Button
            sx={{ width: "max-content", margin: "0 auto" }}
            onClick={props.onClose as any}
          >
            cancel
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

function useNewExercise(onClose: () => void) {
  const [title, setTitle] = useState<string>("");
  const onTitle = (e: OnHTMLInput) => setTitle(() => e.target.value);

  const [desc, setDesc] = useState<string>("");
  const onDesc = (e: OnHTMLInput) => setDesc(() => e.target.value);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { user } = useAuth();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(() => true);
    try {
      const col = firestore.collection(db, FirestoreCollections.exercises);
      const data: Exercise = { userID: user.uid, title, desc, data: [] };
      await firestore.addDoc(col, data);
      onClose();
    } catch (e) {
      console.log(e);
      setError(() => "Server isn't responding.");
    } finally {
      setLoading(() => false);
    }
  };

  return { title, desc, onTitle, onDesc, handleSubmit, error, loading };
}
