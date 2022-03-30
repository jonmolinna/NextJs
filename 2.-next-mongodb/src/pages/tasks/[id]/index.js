import React, { useState } from 'react';
import { Grid, Button, Confirm, Loader } from 'semantic-ui-react';
import Error from 'next/error';
import { useRouter } from 'next/router';

const TaskDetail = ({ task, error }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { query, push } = useRouter();

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  if (error && error.statusCode) {
    return (
      <Error statusCode={error.statusCode} title={error.statusText} />
    )
  };

  const deleteTask = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    deleteTask();
    close();
    push("/");
  };

  return (
      <Grid
        centered
        verticalAlign='middle'
        columns="1"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <h1>{ task.title }</h1>
            <p>{ task.description }</p>
            <div>
              <Button color='red' onClick={open} loading={isDeleting}>
                Delete
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Confirm
          header="Please confirm"
          content="Are you sure you want to delete this task?" 
          open={confirm}
          onConfirm={handleDelete}
          onCancel={close}
        />
      </Grid>
  )
};

// Haciendo peticion desde el Backend
export async function getServerSideProps({ query: { id }}) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);

  if (res.status === 200) {
    const task = await res.json();
    return {
      props: {
        task,
      },
    };
  };

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      }
    },
  };
};

export default TaskDetail;