import React from 'react';
import { Button, Card, Container, Grid } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const Home = ({ tasks }) => {
  const router = useRouter();

  if (tasks.length === 0) return (
    <Grid
      centered
      verticalAlign='middle'
      columns='1'
      style={{ height: '80vh' }}
    >
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <h1>There are no tasks yet</h1>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREKO-o68psHT3jIydO8it53PUq_KoXiDN7mwA5VyLzCU38Wkpb4REopxCGkPyrEkO4bVg&usqp=CAU"
            alt="no task yet"
          />
          <div>
            <Button primary>Create a Task</Button>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )

  return (
    <Container style={{ paddingTop: '20px'}}>
      <Card.Group itemsPerRow={4}>
        {
          tasks.map(task => (
            <Card key={task._id}>
              <Card.Content>
                <Card.Header>{ task.title }</Card.Header>
                <p>{ task.description }</p>
              </Card.Content>
              <Card.Content extra>
                <Button 
                  primary
                  onClick={() => router.push(`/tasks/${task._id}`)}
                >
                  View
                </Button>
                <Button
                  secondary
                  onClick={() => router.push(`/tasks/${task._id}/edit`)}
                >
                  Edit
                </Button>
              </Card.Content>
            </Card>
          ))
        }
      </Card.Group>
    </Container>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch('http://localhost:3000/api/tasks/');
  const data = await res.json();
  // console.log(data);

  return {
    props: { // siempre debe retorna un objeto
      tasks: data,
    }, 
  }
};

export default Home;