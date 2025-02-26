
'use client'
import { motion } from 'framer-motion'
import React from 'react'
import Image from 'next/image'

const images = [
    {
        src: "/images/dummy/a.jpg",
        alt: 'Tree'
    },
    {
        src: "/images/dummy/b.jpg",
        alt: 'Tree'
    },
    {
        src: "/images/dummy/c.jpg",
        alt: 'Tree'
    },
    {
        src: "/images/dummy/a.jpg",
        alt: 'Tree'
    },
    {
        src: "/images/dummy/b.jpg",
        alt: 'Tree'
    }
]

const ROTATION_DEGREES = [10, -20, -5, 5, -2];

const IMAGE_ANIMATION_VARIANTS = {
    initial: () => ({
        scale: 0,
    }),
    animate: (i: number) => ({
        scale: 1,
        rotate: ROTATION_DEGREES[i]
    }),
    transition: (i: number) => ({
        delay: i * 0.1,
        duration: 0.5,
        type: 'spring',
        stiffness: 360,
        damping: 20
    })
}

export default function AirbnbImageAnimation() {
    return (
        <div className='flex justify-center w-full py-8'>
            <motion.div
                className='flex flex-row items-center justify-center shadow-lg rounded-xl overflow-hidden p-4 relative'
            >
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        initial={IMAGE_ANIMATION_VARIANTS.initial()}
                        animate={IMAGE_ANIMATION_VARIANTS.animate(index)}
                        transition={IMAGE_ANIMATION_VARIANTS.transition(index)}
                        className='w-12 h-12 border-2 border-gray-100 rounded-lg -m-3 shadow-lg relative overflow-hidden'
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="48px"
                            className="object-cover"
                            priority={index === 0}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}