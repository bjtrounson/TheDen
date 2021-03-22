import Router from 'next/router';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function UserForm() { 
    const userName = async event => { 
        Router.push(`/logs/${event.target.name.value}`)
    }

    return (
        <>
            <style>
                {`
                    .form-label {
                        color: #6768698e;
                    }

                    form {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                `}
            </style>
            <Form onSubmit={userName}>
                <Form.Label htmlFor="name">Username</Form.Label>
                <Form.Control id="name" name="name" type="text" autoComplete="name" required />
                <Button className="btn-sm btn-dark" type="submit">Submit</Button>
            </Form>
        </>
  )
}

export default UserForm