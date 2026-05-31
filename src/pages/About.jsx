import './About.css';

const About = () => {
  return (
    <div className="about">
      <h1 className="about__title">О проекте</h1>
      <div className="about__content">
        <section className="about__section">
          <h2 className="about__section-title">📚 Технологии</h2>
          <ul className="about__list">
            <li>React 18</li>
            <li>React Router v6</li>
            <li>Context API для управления состоянием</li>
            <li>JSONPlaceholder API</li>
            <li>Vite для сборки</li>
          </ul>
        </section>

        <section className="about__section">
          <h2 className="about__section-title">🎯 Функционал</h2>
          <ul className="about__list">
            <li>Просмотр списка постов</li>
            <li>Детальная информация о посте</li>
            <li>Добавление в избранное</li>
            <li>Адаптивный дизайн</li>
            <li>Обработка ошибок и загрузка</li>
          </ul>
        </section>

        <section className="about__section">
          <h2 className="about__section-title">👨‍💻 Автор</h2>
          <p className="about__text">
            Учебный проект, созданный в рамках курса по React.
            Демонстрирует работу с маршрутизацией, API и управлением состоянием.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;