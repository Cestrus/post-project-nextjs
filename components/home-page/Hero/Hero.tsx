import Image from 'next/image';

import styles from './Hero.module.css';

const Hero = (): JSX.Element => {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/myImage.png"
          alt="My image"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I`m Aleksey!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quas
        non voluptatem assumenda explicabo quo?
      </p>
    </section>
  );
};

export default Hero;
