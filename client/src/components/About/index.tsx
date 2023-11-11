import s from './about.module.scss';

export const About = () => {
  return (
    <section className={s.about}>
      <h2 className={s.title}>Цель и мотивация проекта</h2>
      <p className={s.description}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam libero
        veniam aperiam enim laborum ea expedita, voluptas quasi, architecto
        velit impedit excepturi molestiae, obcaecati temporibus.
      </p>
    </section>
  );
};
