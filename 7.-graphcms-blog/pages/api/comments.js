import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = "https://api-sa-east-1.hygraph.com/v2/cl6o0x9q70k8c01ujh6z0bqyx/master";
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjA5Mzc4OTIsImF1ZCI6WyJodHRwczovL2FwaS1zYS1lYXN0LTEuaHlncmFwaC5jb20vdjIvY2w2bzB4OXE3MGs4YzAxdWpoNnowYnF5eC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNmYwNTc3YzQtZDgxZC00OWU5LWFmNGItYTA1MThmN2ZkN2E1IiwianRpIjoiY2w3MHZqYzZkMXY1ODAxdWw4ZTFvYnBnMyJ9.O8chS4WHpqMbafpBaY4JgmTg0KF4AvpSM_uEmXhYplCfXpALnMiW4azPNWjrTY3sABUcKtbdyeeFdrns-dnbVeCTniH1kBJ3Wh4KjWgNkaY4SCZmTMtuB7Ex-YIJvsit8M5hnF8nKfNbK3ckEK3_jpCANmiaCuSQP4Jj3vfZisCEuU2gpUIgONC_AmVcsh8NEk3wNl3PpijJ2X7BJpNycSVqO51vVB_Cwn3TUSbPdBg0wIPH6KKCXrCg9kzZZb8cp-6rKE2H166r6rPOokdrVVQEysoUUcihMpCFLrxslWefHzgv-zcB1N0Hs7IObbphK5gz6xLyD9E9ZcRYJebQrhQ7JYWRwh1lJkAGTW4XWmyn2xUVhdNj1gR4O8SkQjIa8LNHgBr7y9wtkxr2BChHwZQmP4NbV-yfe__hd87xugTt7XPCAI7D1o8QRmPXBldET_91WbT5yLBWyySep5Bh2_cB3lGoXo7N9RCIfSiosSuJy8fOjvbVRKafJ2-T-eYspMbxVRZFmPig5Ew3Gc2Pzvri-IXAu1J4KC03UNE_a7nd5ZlAN25hHjVGI9dauA4BrAJ0VoE7Y9xaVB-oLP1tR4MxYvdS0oO0FGVqyGqMpqQRo1tOk4CHJJdQos8LdcV3hvFOygwxNRIfAi2yUrmuoPUhMwOSnTwY9KjUn39sdJI';

export default async function comments(req, res) {
    const graphQLClient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    const query = gql`
        mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
            createComment(data: {name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug}}}){id}
        }
    `

    try {
        const result = await graphQLClient.request(query, req.body);
        return res.status(200).send(result);
    } catch (err) {
        console.log('<<', err)
        return res.status(500).send(err);
    }
};