import css from './Section.module.css'

// export const Section = ({ title, children }) => {
//   <>
//       <h2 className={css.title}>{title}</h2>
//       { children}
        
// </>
   
// }
 
export const Section = ({ title, children }) => (
  <>
    <h2 className={css.title}>{title}</h2>
    {children}
  </>
);