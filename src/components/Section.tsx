// src/components/Section.jsx
const Section = ({ title, description, background }: { title: string, description: string, background: string }) => {
    return (
      <section
        class={`w-full min-h-screen flex flex-col justify-center items-center px-8 bg-gradient-to-b ${background}`}
      >
        <h2 class="font-playfair text-7xl md:text-8xl tracking-wider text-sky-700 font-thin uppercase text-center pb-6 my-12">
          {title}
        </h2>
        <div class="w-24 h-1 bg-gold-500 mb-8"></div>
        <p class="text-3xl max-w-5xl uppercase font-thin leading-loose tracking-widest text-justify">
          {description}
        </p>
      </section>
    );
  };
  
  export default Section;