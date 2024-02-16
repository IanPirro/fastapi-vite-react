import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import css from './OnboardingPage.module.css'

import { QUERY_KEYS } from '@/core/constants'
import Alert from '@/framework/Alert'
import Button from '@/framework/Button'
import { useCompleteOnboarding } from '@/hooks/api/useCompleteOnboarding'
import { urls } from '@/util/url'

const StepOne = () => {
  return (
    <Alert
      title="1️. What are we doing here?"
      className="mt-10 mb-5 bg-white min-h-[150px]"
      icon={false}
    >
      I'm baby beard quinoa waistcoat sriracha, JOMO DIY butcher umami hashtag
      subway tile franzen crucifix viral stumptown four dollar toast. Sus fam
      slow-carb gastropub af. Artisan everyday carry sriracha migas kale chips.
      Chillwave fanny pack air plant hoodie direct trade pok pok marfa man braid
      ascot shabby chic roof party freegan vape. +1 coloring book raclette
      unicorn narwhal flexitarian slow-carb mukbang tumblr palo santo lomo sus
      retro adaptogen try-hard. Meggings health goth before they sold out,
      pitchfork keffiyeh coloring book readymade freegan pop-up franzen
      waistcoat.
    </Alert>
  )
}

const StepTwo = () => {
  return (
    <Alert
      title="2. Getting Started"
      className="mt-10 mb-5 bg-white min-h-[150px]"
      icon={false}
    >
      Hoodie shoreditch messenger bag austin crucifix waistcoat leggings
      kickstarter. Direct trade ugh raclette flexitarian brunch cornhole neutral
      milk hotel scenester shaman. Distillery tilde iceland, messenger bag twee
      DIY pabst pitchfork green juice. Portland bodega boys church-key 3 wolf
      moon bushwick hell of coloring book quinoa. Crucifix authentic knausgaard
      four dollar toast thundercats. Praxis fanny pack snackwave kombucha
      neutral milk hotel marfa.
    </Alert>
  )
}

const StepThree = () => {
  return (
    <Alert
      title="3️. Task and Scenario"
      className="mt-10 mb-5 bg-white min-h-[150px]"
      icon={false}
    >
      Portland marxism direct trade lyft helvetica paleo gluten-free trust fund.
      Man bun listicle crucifix, ennui yuccie swag migas fam beard unicorn
      marxism vegan next level. Bodega boys forage artisan palo santo, hoodie
      master cleanse fingerstache tilde typewriter Brooklyn lumbersexual. Twee
      gochujang shaman, offal pickled readymade blog small batch fam keffiyeh
      mustache irony hexagon. Tumblr gluten-free kombucha fixie four loko etsy.
    </Alert>
  )
}

const getStep = (step: number) => {
  switch (step) {
    case 1:
      return <StepOne />
    case 2:
      return <StepTwo />
    case 3:
      return <StepThree />
    default:
      return null
  }
}

const OnboardingPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const { mutate: completeOnboarding } = useCompleteOnboarding()
  const queryClient = useQueryClient()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    completeOnboarding(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.me,
        })
        navigate(urls.home)
      },
      onError: () => {
        setSubmitting(false)
      },
    })
  }

  const handleNext = () => {
    setStep((previous) => Math.min(previous + 1, 3))
  }

  const handleClick = step === 3 ? handleSubmit : handleNext
  const buttonText = step === 3 ? "I'm ready!" : 'Next'

  return (
    <div className={css.root}>
      <div className={css.inner}>
        <h1 className={css.title}>👇 Just a few more quick things👇</h1>
        {getStep(step)}
        <Button
          variant="secondary"
          size="large"
          type="submit"
          fullWidth
          disabled={submitting}
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

export default OnboardingPage
