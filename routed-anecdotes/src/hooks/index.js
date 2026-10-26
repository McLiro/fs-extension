import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (e) => setValue(e.target.value)
  const reset = () => setValue('')

  return {
    inputProps: { type, value, onChange },
    reset
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(setAnecdotes)
  }, [])

  const addAnecdote = async (anecdote) => {
    const created = await anecdoteService.createNew({...anecdote, id: Math.round(Math.random() * 10000)})
    setAnecdotes(a => a.concat(created))
  }

  const deleteAnecdote = async (id) => {
    await anecdoteService.deleteAnecdote(id)
    setAnecdotes(anecdotes.filter(a => a.id !== id))
  }

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote
  }
}
