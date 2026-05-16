import * as React from 'react'
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
  ReviewStars,
} from '@/components/blocks/animated-cards-stack'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const TESTIMONIALS = [
  {
    id: 'testimonial-3',
    name: 'James S.',
    profession: 'Frontend Developer',
    rating: 5,
    description:
      'Their innovative solutions and quick turnaround time made our collaboration incredibly successful. Highly recommended!',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'testimonial-1',
    name: 'Jessica H.',
    profession: 'Web Designer',
    rating: 4.5,
    description:
      'The attention to detail and user experience in their work is exceptional. I am thoroughly impressed with the final product.',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'testimonial-2',
    name: 'Lisa M.',
    profession: 'UX Designer',
    rating: 5,
    description:
      'Working with them was a game-changer for our project. Their expertise and professionalism exceeded our expectations.',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'testimonial-4',
    name: 'Jane D.',
    profession: 'UI/UX Designer',
    rating: 4.5,
    description:
      'The quality of work and communication throughout the project was outstanding. They delivered exactly what we needed.',
    avatarUrl:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60',
  },
] as const

const ANIM_IMAGES = [
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&auto=format&fit=crop&q=60',
] as const

function useHtmlDarkClass() {
  const [dark, setDark] = React.useState(false)
  React.useEffect(() => {
    const el = document.documentElement
    const read = () => setDark(el.classList.contains('dark'))
    read()
    const obs = new MutationObserver(read)
    obs.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return dark
}

function getSectionClass(dark: boolean) {
  return dark ? 'bg-destructive text-secondary px-8 py-12' : 'bg-accent px-8 py-12'
}

function getReviewStarsClass(dark: boolean) {
  return dark ? 'text-primary' : 'text-teal-500'
}

function getTextClass(dark: boolean) {
  return dark ? 'text-primary-foreground' : ''
}

function getAvatarClass(dark: boolean) {
  return dark ? '!size-12 border border-stone-700' : '!size-12 border border-stone-300'
}

function getCardVariant(dark: boolean): 'dark' | 'light' {
  return dark ? 'dark' : 'light'
}

/** Mirrors the template `TestimonialsVariant` without `next-themes` (Tailwind `dark` class on `html`). */
export function TestimonialsVariant() {
  const dark = useHtmlDarkClass()

  return (
    <section className={getSectionClass(dark)}>
      <div>
        <h3 className="text-center text-4xl font-semibold">Testimonials</h3>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus consequatur reprehenderit.
        </p>
      </div>
      <ContainerScroll scrollOffset={['start end', 'end start']} className="container min-h-svh h-[300vh]">
        <div className="sticky left-0 top-0 flex h-svh w-full items-center justify-center py-12">
          <CardsContainer className="mx-auto size-full h-[450px] w-[350px]">
            {TESTIMONIALS.map((testimonial, index) => (
              <CardTransformed
                arrayLength={TESTIMONIALS.length}
                key={testimonial.id}
                variant={getCardVariant(dark)}
                index={index}
                role="article"
                aria-labelledby={`card-${testimonial.id}-title`}
                aria-describedby={`card-${testimonial.id}-content`}
              >
                <div className="flex flex-col items-center space-y-4 text-center">
                  <ReviewStars className={getReviewStarsClass(dark)} rating={testimonial.rating} />
                  <div className={`mx-auto w-4/5 text-lg ${getTextClass(dark)}`}>
                    <blockquote id={`card-${testimonial.id}-content`} cite="#">
                      {testimonial.description}
                    </blockquote>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className={getAvatarClass(dark)}>
                    <AvatarImage src={testimonial.avatarUrl} alt={`Portrait of ${testimonial.name}`} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span
                      id={`card-${testimonial.id}-title`}
                      className="block text-lg font-semibold tracking-tight md:text-xl"
                    >
                      {testimonial.name}
                    </span>
                    <span className="block text-sm text-muted-foreground">{testimonial.profession}</span>
                  </div>
                </div>
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
    </section>
  )
}

export function AwardsVariant() {
  return (
    <section className="bg-accent px-8 py-12">
      <div>
        <h2 className="text-center text-4xl font-semibold">Recognitions</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus consequatur reprehenderit.
        </p>
      </div>
      <ContainerScroll scrollOffset={['start end', 'end start']} className="container min-h-svh h-[300vh]">
        <div className="sticky left-0 top-0 flex h-svh w-full items-center justify-center py-12">
          <CardsContainer className="mx-auto size-full h-72 w-[440px]">
            <CardTransformed
              className="items-start justify-evenly border-none bg-blue-600/80 text-secondary backdrop-blur-md"
              arrayLength={4}
              index={0}
            >
              <div className="flex flex-col items-start justify-start space-y-4">
                <div className="flex size-16 items-center justify-center rounded-sm bg-secondary/50 text-2xl">🏆</div>
                <div>
                  <h4 className="text-sm uppercase tracking-wide">Awwwards</h4>
                  <h3 className="text-2xl font-bold">Site of the Day</h3>
                </div>
              </div>
              <p className="text-secondary/80">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus consequatur reprehenderit.
              </p>
            </CardTransformed>

            <CardTransformed
              className="items-start justify-evenly border-none bg-orange-600/80 text-secondary backdrop-blur-md"
              arrayLength={4}
              index={1}
            >
              <div className="flex flex-col items-start justify-start space-y-4">
                <div className="flex size-16 items-center justify-center rounded-sm bg-secondary/50 text-2xl">🚀</div>
                <div>
                  <h4 className="text-sm uppercase tracking-wide">Performance</h4>
                  <h3 className="text-2xl font-bold">100% Performance Score</h3>
                </div>
              </div>
              <p className="text-secondary/80">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus consequatur reprehenderit.
              </p>
            </CardTransformed>
            <CardTransformed
              className="items-start justify-evenly border-none bg-cyan-600/80 text-secondary backdrop-blur-md"
              arrayLength={4}
              index={2}
            >
              <div className="flex flex-col items-start justify-start space-y-4">
                <div className="flex size-16 items-center justify-center rounded-sm bg-secondary/50 text-2xl">🎯</div>
                <div>
                  <h4 className="text-sm uppercase tracking-wide">CSS Awards</h4>
                  <h3 className="text-2xl font-bold">Honorable Mention</h3>
                </div>
              </div>
              <p className="text-secondary/80">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus consequatur reprehenderit.
              </p>
            </CardTransformed>
            <CardTransformed
              className="items-start justify-evenly border-none bg-violet-600/80 text-secondary backdrop-blur-md"
              arrayLength={4}
              index={3}
            >
              <div className="flex flex-col items-start justify-start space-y-4">
                <div className="flex size-16 items-center justify-center rounded-sm bg-secondary/50 text-2xl">🎖</div>
                <div>
                  <h4 className="text-sm uppercase tracking-wide">Awards</h4>
                  <h4 className="text-2xl font-bold">Most Creative Design</h4>
                </div>
              </div>
              <p className="text-secondary/80">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus consequatur reprehenderit.
              </p>
            </CardTransformed>
          </CardsContainer>
        </div>
      </ContainerScroll>
    </section>
  )
}

export function ImagesVariant() {
  return (
    <section className="bg-slate-900 px-8 py-12">
      <div>
        <h2 className="text-center text-4xl font-semibold text-white">Try our AI showcase</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus consequatur reprehenderit.
        </p>
      </div>
      <ContainerScroll scrollOffset={['start end', 'end start']} className="container min-h-svh h-[300vh]">
        <div className="sticky left-0 top-0 flex h-svh w-full items-center justify-center py-12">
          <CardsContainer className="mx-auto size-full h-[420px] w-[320px]">
            {ANIM_IMAGES.map((imageUrl, index) => (
              <CardTransformed
                arrayLength={ANIM_IMAGES.length}
                key={imageUrl}
                index={index}
                variant="dark"
                className="overflow-hidden !rounded-sm !p-0"
              >
                <img
                  src={imageUrl}
                  alt="Abstract gradient artwork"
                  className="size-full object-cover"
                  width={320}
                  height={420}
                />
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
    </section>
  )
}
