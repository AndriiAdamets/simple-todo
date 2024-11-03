import React, {useState, forwardRef, useImperativeHandle} from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form, Modal } from 'react-bootstrap';
import { Todo } from './services/types';

export const TodoForm = forwardRef(({onFormSubmit}: {onFormSubmit: (data: Todo) => void}, ref) => {
  const {register, handleSubmit, reset} = useForm<Todo>();
    const [isModalVisible, setModalVisibility] = useState(false);
    const openModal = (data: Todo) => {
      reset(data);
        setModalVisibility(true);
    }

    const closeModal = () => setModalVisibility(false);

    const onSubmit: SubmitHandler<Todo> = data => {
      onFormSubmit(data);
      closeModal();
    };

    useImperativeHandle(ref, () => ({
        openModal
    }), []);
    return (
      <Modal
          size="sm"
          show={isModalVisible}
          onHide={closeModal}
          aria-labelledby="todo-dialog-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="todo-dialog-title">
              Todo Form
            </Modal.Title>
          </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control {...register('title')} type="text" placeholder="Make my job" />
            </Form.Group>
            <Form.Check
              {...register('completed')}
              type='checkbox'
              label="Done"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
        </Modal>
    );
})