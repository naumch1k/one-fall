export const imageVariants = {
  initial: {
    opacity: 0,
    scale: .8,
    transition: { duration: .7 },
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: .7 },
  },
}

export const headingVariants = {
  initial: {
    opacity: 0,
    y: 10,
    transition: { duration: .4 },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: .4 },
  },
}

export const textVariants = {
  initial: {
    opacity: 0,
    y: 10,
    transition: { duration: .4, delay: .3 },
  },
  animate: {
    opacity: 0.9,
    y: 0,
    transition: { duration: .4, delay: .3 },
  },
}
