/** Conteneur de section : ancre de scroll + rythme vertical homogène. */
export default function Section({ id, children, className = '', ...rest }) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 px-5 py-24 sm:px-8 md:py-32 ${className}`}
      {...rest}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}
