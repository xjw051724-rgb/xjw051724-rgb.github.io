import { careerExperiences } from '../data/portfolio'

export function CareerHistory() {
  return (
    <section className="career-history" id="career-history">
      <div className="portfolio-shell career-history__shell" data-testid="content-container">
        <div className="career-history__grid" data-testid="career-history">
          {careerExperiences.map((experience, index) => (
            <article className="career-card" key={experience.company}>
              <div className="career-card__topline">
                <span>{experience.period}</span>
                <strong>{String(index + 1).padStart(2, '0')}</strong>
              </div>
              <div className="career-card__company">
                <img alt={`${experience.company}标识`} decoding="async" src={experience.logo} />
                <div>
                  <h2>{experience.company}</h2>
                  <p>{experience.role}</p>
                </div>
              </div>
              <p className="career-card__description">{experience.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
