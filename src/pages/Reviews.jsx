import { useEffect, useMemo, useState } from 'react'
import seed from '../data/reviews'
import './Reviews.css'

const KEY = 'lionels-cards-reviews'

function Stars({ value, label }) {
  return (
    <span className="stars" role="img" aria-label={label ?? `${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"
          className={n <= value ? 'star is-on' : 'star'}>
          <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45-4.7-4.6 6.5-.95Z" />
        </svg>
      ))}
    </span>
  )
}

/** The star input. Radios rather than buttons, so one Tab lands on the group
    and the arrow keys pick a value the way a rating control should. */
function StarPicker({ value, onChange }) {
  return (
    <fieldset className="picker">
      <legend className="filter-label">Your rating</legend>
      <div className="picker-row">
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className={n <= value ? 'picker-star is-on' : 'picker-star'}>
            <input
              type="radio"
              name="stars"
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className="sr-only"
            />
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
              <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45-4.7-4.6 6.5-.95Z" />
            </svg>
            <span className="sr-only">{n} star{n === 1 ? '' : 's'}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    const mine = raw ? JSON.parse(raw) : []
    return Array.isArray(mine) ? mine : []
  } catch {
    return []
  }
}

export default function Reviews() {
  const [mine, setMine] = useState(load)
  const [name, setName] = useState('')
  const [stars, setStars] = useState(5)
  const [text, setText] = useState('')
  const [posted, setPosted] = useState('')
  const [minStars, setMinStars] = useState(0)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(mine))
    } catch {
      /* Storage being unavailable should not lose what is already on screen. */
    }
  }, [mine])

  const all = useMemo(() => [...mine, ...seed], [mine])
  const shown = useMemo(() => all.filter((r) => r.stars >= minStars), [all, minStars])

  const average = all.length
    ? Math.round((all.reduce((sum, r) => sum + r.stars, 0) / all.length) * 10) / 10
    : 0

  const submit = (event) => {
    event.preventDefault()
    if (!name.trim() || !text.trim()) return
    const review = {
      id: `mine-${all.length + 1}-${name.trim()}`,
      name: name.trim(),
      stars,
      review: text.trim(),
      mine: true,
    }
    setMine((current) => [review, ...current])
    setPosted(`Thanks ${review.name} — your ${review.stars}-star review is up.`)
    setName('')
    setText('')
    setStars(5)
    /* A filter that hides the review someone just wrote reads as data loss,
       so it gets dropped rather than silently swallowing the post. */
    if (review.stars < minStars) setMinStars(0)
  }

  return (
    <div className="reviews">
      <div className="shell">
        <header className="page-head">
          <p className="eyebrow">Feedback</p>
          <h1 className="page-title">What buyers said</h1>
          <div className="reviews-summary">
            <span className="reviews-avg price">{average}</span>
            <Stars value={Math.round(average)} label={`Average ${average} out of 5`} />
            <span className="reviews-count">
              from {all.length} review{all.length === 1 ? '' : 's'}
            </span>
          </div>
        </header>

        <div className="reviews-controls">
          <label className="filter-label" htmlFor="minStars">
            Show
          </label>
          <select
            id="minStars"
            value={minStars}
            onChange={(event) => setMinStars(Number(event.target.value))}
          >
            <option value={0}>All ratings</option>
            <option value={5}>5 stars only</option>
            <option value={4}>4 stars and up</option>
            <option value={3}>3 stars and up</option>
          </select>
          <span className="reviews-showing" role="status">
            {shown.length} of {all.length}
          </span>
        </div>

        {shown.length === 0 ? (
          <div className="empty">
            <p className="empty-title">Nothing that highly rated yet</p>
            <p>Try lowering the filter.</p>
          </div>
        ) : (
          <ul className="reviews-grid">
            {shown.map((review) => (
              <li key={review.id} className={review.mine ? 'review is-mine' : 'review'}>
                <div className="review-top">
                  {/* An initial, not a "Name:" label — the old card printed the
                      field name in front of every reviewer. */}
                  <span className="review-avatar" aria-hidden="true">
                    {review.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="review-name">{review.name}</p>
                    <Stars value={review.stars} />
                  </div>
                  {review.mine && <span className="tag review-tag">Yours</span>}
                </div>
                <p className="review-text">{review.review}</p>
              </li>
            ))}
          </ul>
        )}

        <section className="review-form-wrap">
          <h2 className="review-form-title">Leave a review</h2>
          <form className="review-form" onSubmit={submit}>
            <div className="filter-group">
              <label className="filter-label" htmlFor="rname">
                Your name
              </label>
              <input
                id="rname"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                maxLength={40}
                placeholder="Who is this from?"
              />
            </div>

            <StarPicker value={stars} onChange={setStars} />

            <div className="filter-group review-field-wide">
              <label className="filter-label" htmlFor="rtext">
                Your review
              </label>
              <textarea
                id="rtext"
                value={text}
                onChange={(event) => setText(event.target.value)}
                required
                maxLength={280}
                rows={3}
                placeholder="How did it go?"
              />
              <p className="review-remaining">{280 - text.length} characters left</p>
            </div>

            <button type="submit" className="btn">
              Post review
            </button>
          </form>

          {posted && (
            <p className="review-posted" role="status">
              {posted}
            </p>
          )}
        </section>
      </div>
    </div>
  )
}
