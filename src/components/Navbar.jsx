/*
 * Navbar no padrão do HeroUI v3.
 *
 * O HeroUI v3 removeu o componente <Navbar> (antes do v2) e a documentação
 * oficial recomenda compor a barra com HTML nativo + Tailwind usando os
 * tokens do tema. Este componente encapsula esse padrão com um visual
 * moderno: barra flutuante, cantos arredondados e fundo translúcido.
 */
export function Navbar({ children, menu, maxWidth = 'max-w-6xl', className = '' }) {
  return (
    <div className="sticky top-3 z-40 w-full px-4">
      <nav
        className={`overflow-hidden rounded-2xl border border-separator bg-background/70 shadow-lg shadow-black/5 backdrop-blur-xl ${maxWidth} mx-auto ${className}`}
      >
        <header className="flex h-14 w-full items-center px-4 md:px-6">{children}</header>
        {menu}
      </nav>
    </div>
  )
}