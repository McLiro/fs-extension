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

  return {
    anecdotes,
    addAnecdote
  }
}
