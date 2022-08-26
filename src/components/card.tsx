import { useEffect, useRef, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import ImgCard from '../assets/card-back.jpg'
import { CardProps } from '../types'
import '../styles/index.css'

export const Card = ({ index, shuffle, src, alt }: CardProps) => {
  const divRef = useRef(null)
  const [axisDiff, setAxisDiff] = useState<any>(null)
  const transformFrom = {transform: axisDiff ? `translateX(${axisDiff.left}px) translateY(${axisDiff.top}px) rotateY(180deg)` : ''}
  const transformTo = {transform: `translateX(0px) translateY(0px) rotateY(0deg)`}

  const styles = useSpring({
    from: shuffle === 'FilterList' || shuffle === 'OrderedList' ? transformFrom : transformTo,
    to: shuffle === 'FilterList' || shuffle === 'OrderedList' ? transformTo : transformFrom,
    delay: shuffle === 'FilterList' ? (index + 1) * 1000 : (index + 1) * 100,
    pause: !axisDiff
  })

  useEffect(() => {
    const deckSite = {left: 60, top: 160}
    const cardSite = position(divRef.current)
    const nextaxisDiff = {
      left: deckSite.left - cardSite.left,
      top: deckSite.top - cardSite.top
    }
    setAxisDiff(nextaxisDiff)
  }, [divRef, index, setAxisDiff])

  const position = (element: any) => {
    if (element) {
      const data = element.getBoundingClientRect()
      return {
        left: data.left + window.scrollX,
        top: data.top + window.scrollY
      }
    }
    return {left: 60, top: 160}
  }

  return (
    <animated.div
      className='animation'
      ref={divRef}
      style={{
        ...styles
      }}
    >
      <div className='animation-init'>
        <img src={ImgCard} alt={alt} className='animation-card' />
      </div>
      <div className='animation-second'>
        <img src={src} alt={alt} className='animation-card' />
      </div>
    </animated.div>
  )
}
