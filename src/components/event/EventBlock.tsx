import React from 'react'
import { EventBanner } from '../../api/mainApi'

interface Props {
  event: EventBanner
}

const EventBlock: React.FC<Props> = ({ event }) => (
  <a
    href={event.previewImage.filePath}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-white rounded-2xl overflow-hidden shadow h-40"
  >
    <img
      src={event.previewImage.filePath}
      alt={event.title}
      className="w-full h-full object-cover"
    />
  </a>
)

export default EventBlock
