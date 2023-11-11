import { listRules } from './rules';

import s from './rules.module.scss';

export const Rules = () => {
  return (
    <section className={s.rules}>
      <h2 className={s.title}>Добро пожаловать!</h2>
      <p className={s.description}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam libero
        veniam aperiam enim laborum ea expedita, voluptas quasi, architecto
        velit impedit excepturi molestiae, obcaecati temporibus.
      </p>
      <ul className={s.list}>
        {listRules.map((item, i) => (
          <li className={s.list__item} key={i}>
            <span className={s.list__icon}>{<item.icon />}</span>
            <p>{item.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
