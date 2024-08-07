import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';

import Header from '../Header.jsx';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchEvent, queryClient, deleteEvent } from '../../utils/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';
export default function EventDetails() {
  const params = useParams();
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  });

  const {
    mutate,
    isPending,
    isError: isErrorDeleting,
    error: deletionError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none',
      });
      navigate('/events');
    },
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }
  function handleDelete() {
    mutate({ id: params.id });
  }

  let content;

  if (isLoading) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching event data...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            'Failed to fetch event data, please try again later.'
          }
        />
      </div>
    );
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure</h2>
          <p>Do you really want to delete ?</p>

          {isPending && <p>Deleting, please wait ...</p>}

          {!isPending && (
            <div className="form-actions">
              <button className="button-text" onClick={handleStopDelete}>
                Cancel
              </button>
              <button className="button" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}

          {isErrorDeleting && (
            <ErrorBlock
              title="Failed to delete event"
              message={
                deletionError.info?.message ||
                'Failed to delete event, please try again later.'
              }
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
