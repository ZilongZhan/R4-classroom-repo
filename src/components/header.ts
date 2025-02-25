export const renderHeader = () => {
  const header = document.createElement("header");

  const currentUrl = new URL(window.location.href);

  header.innerHTML = `
    <header class="main-header">
      <div class="container">
        <h1>Classroom</h1>
        <nav class="main-navigation">
          <ul>
            <li><a href="/estudiantes"${
              currentUrl.pathname === "/estudiantes" ? " class='active'" : ""
            }>Estudiantes</a></li> 
            <li><a href="/cursos"${
              currentUrl.pathname === "/cursos" ? " class='active'" : ""
            }>Cursos</a></li> 
            <li><a href="/notas"${
              currentUrl.pathname === "/notas" ? " class='active'" : ""
            }>Notas</a></li>
            <li><a href="/estadisticas"${
              currentUrl.pathname === "/estadisticas" ? " class='active'" : ""
            }>Estadísticas</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `;

  document.body.prepend(header);
};
