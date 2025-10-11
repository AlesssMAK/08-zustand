'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import type { NoteTag } from '../../types/note';
import css from './NoteForm.module.css';
import { useRouter } from 'next/navigation';

const NoteForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const newNote = {
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        tag: formData.get('tag') as NoteTag,
      };
      return await createNote(newNote);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.back();
    },
  });

  const handleSubmit = (formData: FormData) => {
    mutation.mutate(formData);
  };
  return (
    <form
      className={css.form}
      action={handleSubmit}
    >
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          // disabled=false
        >
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
