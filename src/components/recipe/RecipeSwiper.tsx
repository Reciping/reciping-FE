// src/components/recipe/RecipeSwiper.tsx
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import RecipeCard from './RecipeCard'
import nonImage from '../../assets/nonImage.jpeg'
import 'swiper/css'
import 'swiper/css/navigation'

interface Props {
  recipes: Recipe[]
  onCardClick?: (id: number) => void
}

const ITEMS_PER_PAGE = 5

const RecipeSwiper: React.FC<Props> = ({ recipes, onCardClick }) => {
  const pages = Array.from(
    { length: Math.ceil(recipes.length / ITEMS_PER_PAGE) },
    (_, i) => recipes.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE),
  )

  return (
    <Swiper modules={[Navigation]} loop>
      {pages.map((group, idx) => (
        <SwiperSlide key={idx}>
          <div className="grid grid-cols-5 gap-4">
            {group.map(r => (
              <RecipeCard
                key={r.id}
                imageUrl={r.imageUrl?.trim() ? r.imageUrl : nonImage}
                title={r.title}
                likeCount={r.likeCount}
                onClick={() => onCardClick?.(r.id)}
              />
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default RecipeSwiper
