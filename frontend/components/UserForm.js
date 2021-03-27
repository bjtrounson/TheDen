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
                        color: #b8b8b8;
                    }

                    form {
                        background-color: #424242;
                        border-radius: 6px;
                        padding: 1em;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }

                    .form-control {
                        margin-bottom: 0.5em;
                    }
                `}
            </style>
            <Form onSubmit={userName} className="shadow">
                <Form.Label htmlFor="name">Username</Form.Label>
                <Form.Control id="name" name="name" type="text" autoComplete="name" required />
                <Button className="btn-sm btn-dark" type="submit">Submit</Button>
            </Form>
        </>
  )
}

export default UserForm