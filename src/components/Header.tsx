const Header = ({
  shrunk,
  stickyHeight
}: {
  shrunk: boolean;
  stickyHeight: string;
}) => {
  return (
    <header
      className={`${
        shrunk ? `fixed ease md:h-[${stickyHeight}]` : ""
      } w-full top-0 text-gray-600 mb-3 bg-app-primary z-[49]`}
    >
      <div className="flex flex-col items-center">
        <div
          className={`${
            shrunk ? "justify-start" : "justify-center mb-3 md:mb-5"
          } flex title-font font-medium  w-full p-2 md:p-4`}
        >
          <a href="/" aria-label="Go to Home Page">
            <svg
              aria-hidden="true"
              className="ease-in-out duration-300"
              width={shrunk ? "45" : "178.59612922454644"}
              height={shrunk ? "40" : "176.39125213623046"}
              viewBox="0 0 170.85936202417773 168.75"
            >
              <defs id="SvgjsDefs1562"></defs>
              <g
                id="SvgjsG1563"
                transform="matrix(1.6197780714224408,0,0,1.6197780714224408,-0.06076776569450132,0.0464394112826575)"
                fill="#79c4f2"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M104.6 41.3a52.2 52.2 0 0 0-3.5-11.2A51.1 51.1 0 0 0 44.3 1a49.6 49.6 0 0 0-5.7 1.5 49.1 49.1 0 0 0-7.9 2.7A51.6 51.6 0 0 0 6.3 77a53.7 53.7 0 0 0 4.1 6.4 57 57 0 0 0 5 5.7 51.7 51.7 0 0 0 55.3 11.5l3.3-1.4 3-1.5a50.9 50.9 0 0 0 5.8-3.8l2.7-2.1 1.2-1.1 1.1-.9 2-1.8.7-.6.6-.7 1.8-2a48.5 48.5 0 0 0 5.9-8.3 50.4 50.4 0 0 0 5.6-14.7 51.6 51.6 0 0 0 .2-20.4zM87.1 88.6l-1.2 1.1-1.2 1.1-2.6 2.1a49.5 49.5 0 0 1-5.7 3.6l-3 1.5-3.2 1.3-4.9 1.6h-.5a50.9 50.9 0 0 1-20.3.1 51.8 51.8 0 0 1-11.1-3.6A50.5 50.5 0 0 1 22.9 91a52 52 0 0 1-9.1-9.4 50.3 50.3 0 0 1-3.7-5.7c-.6-1-1.1-2-1.6-3.1s-1-2.1-1.3-3.2a50.6 50.6 0 0 1 8.6-50.8l.8-.8.5-.6.6-.6 1.2-1.1 2.4-2.1A50.5 50.5 0 0 1 62.4 3.2a48.5 48.5 0 0 1 14.7 5.2 47 47 0 0 1 8.3 5.8l2 1.8.7.6.6.7 1.8 2a49.7 49.7 0 0 1 11.3 22.9 50.8 50.8 0 0 1-.1 20.2 51.6 51.6 0 0 1-3.6 11 50.2 50.2 0 0 1-6.6 10.5l-2.1 2.4zm-44.9 13a50.1 50.1 0 0 1-13.7-5 51.8 51.8 0 0 1-6.2-4 55.2 55.2 0 0 1-5.5-4.8 49.9 49.9 0 0 1-11-53.2c.4-1.1.9-2.1 1.3-3.1l.6-1.3a50.2 50.2 0 0 0-3.4 11 51.3 51.3 0 0 0 2.4 28.5c.4 1.1.9 2.2 1.4 3.2s1 2.1 1.6 3.1a50.6 50.6 0 0 0 3.7 5.8 51.5 51.5 0 0 0 9.2 9.5 50.9 50.9 0 0 0 10.7 6.5 51 51 0 0 0 28.7 3.9 50.3 50.3 0 0 1-19.8-.1zm61.9-39.9a50.2 50.2 0 0 1-5.5 14.7 48.4 48.4 0 0 1-5.8 8.3l-1.8 2-.6.7-.7.6-1.9 1.7h.2l2.3-2.4 2.1-2.5A51.3 51.3 0 0 0 98.9 74a51.4 51.4 0 0 0 3.2-31.6 49.6 49.6 0 0 0-2.5-8.2 49.4 49.4 0 0 0-3.1-6.5 48.7 48.7 0 0 0-5.9-8.3l-1.8-2-.6-.7-.7-.6-2-1.8A49.9 49.9 0 0 0 77.3 8a49.3 49.3 0 0 0-6.5-3.2 49.8 49.8 0 0 0-8.2-2.6A52.2 52.2 0 0 0 49.9 1a50.8 50.8 0 0 1 22.7 3.2l3.2 1.3 3.1 1.6a50.1 50.1 0 0 1 5.7 3.7l2.6 2.1 1.2 1.1 1.2 1.1 2.3 2.3 2.1 2.4a50.4 50.4 0 0 1 6.5 10.5 51.6 51.6 0 0 1 3.6 11 51.1 51.1 0 0 1 0 20.3z"
                ></path>
              </g>
              <g
                id="SvgjsG1564"
                transform="matrix(0.2380328871548467,0,0,0.2380328871548467,75,30)"
                fill="#5b9ed9"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#5b9ed9"
                  d="M17.848,0C8.479,0,0,7.654,0,18.26c0,11.044,10.012,21.358,23.749,17.258  c2.495,1.874,7.997,3.77,11.867,4.627c-1.444-3.489-3.046-8.279-2.964-11.619c1.944-2.852,3.043-6.524,3.043-10.266  C35.695,7.712,27.275,0,17.848,0z M28.765,20.614c-1.841,3.266-5.107,5.729-10.804,10.141c-5.696-4.412-8.962-6.874-10.805-10.141  c-2.593-4.59-1.022-8.481,2.262-10.004c3.084-1.43,7.117-0.086,8.543,2.991c1.427-3.077,5.46-4.419,8.544-2.991  C29.788,12.133,31.358,16.024,28.765,20.614z M66.643,39.37c1.261,0,2.286-1.656,2.286-3.702c0-2.045-1.025-3.702-2.286-3.702  c-1.262,0-2.282,1.657-2.282,3.702C64.361,37.713,65.381,39.37,66.643,39.37z M56.56,39.37c1.263,0,2.285-1.656,2.285-3.702  c0-2.045-1.022-3.702-2.285-3.702c-1.26,0-2.282,1.657-2.282,3.702C54.278,37.713,55.3,39.37,56.56,39.37z M76.111,46.188  c4.84-4.151,7.909-10.305,7.911-17.183C84.02,16.507,73.889,6.377,61.39,6.375C48.891,6.377,38.762,16.507,38.76,29.006  c0.001,7.006,3.184,13.264,8.181,17.417c-6.427,5.322-7.996,14.471-8.006,24.445c0.068,0.963,0.602,1.238,0.828,1.418  c0.479,0.303,0.913,0.439,1.423,0.607c0.749,0.236,1.601,0.453,2.225,0.652c0.1,0.033,0.193,0.064,0.277,0.094  c0.295,3.654,2.099,6.146,4.759,7.252c2.772,1.191,6.178,1.242,10.064,1.256c0.955,0,1.943-0.004,2.956-0.004  c4.643-0.01,8.737,0.031,12.024-1.055c1.637-0.551,3.106-1.436,4.156-2.809c0.947-1.227,1.517-2.779,1.724-4.639  c0.424-0.15,1.148-0.377,1.787-0.555c0.511-0.152,0.999-0.305,1.45-0.494c0.227-0.104,0.443-0.203,0.694-0.393  c0.218-0.18,0.664-0.518,0.7-1.328C84,65.388,83.637,60.224,82.269,55.739C81.113,51.937,79.166,48.608,76.111,46.188z   M41.615,30.544l3.888-5.789c0,0,4.216,3.052,13.144,5.047c8.925,1.996,17.331-0.095,17.331-0.095s2.375,4.425,4.112,5.923  c-1.26,3.552-3.511,6.63-6.407,8.923l-0.079-0.047l-0.747,0.545c-3.264,2.371-7.25,3.783-11.585,3.797  c-0.115-0.004-0.231-0.008-0.345-0.01c-0.231-0.004-0.461-0.018-0.692-0.027C50.327,48.224,42.386,40.402,41.615,30.544z   M67.282,50.856c-0.212,0.393-0.488,0.789-0.875,1.152c-0.857,0.791-2.251,1.514-4.871,1.523c-3.58-0.031-4.969-1.234-5.742-2.318  c-0.066-0.096-0.119-0.193-0.176-0.289c1.457,0.371,2.972,0.602,4.524,0.68c0.19,0.008,0.383,0.012,0.572,0.014  c0.168,0.006,0.333,0.018,0.5,0.018c0.021,0,0.04-0.002,0.06-0.002c0.039,0,0.076,0.002,0.116,0.002  C63.428,51.636,65.404,51.362,67.282,50.856z M79.141,70.78c-0.129,0.039-0.252,0.082-0.373,0.121l-1.691-12.314  c0,0-0.382,13.67-0.431,14.209c-0.113,1.764-0.558,2.938-1.203,3.781c-0.957,1.252-2.577,1.988-5.008,2.381  c-2.406,0.389-5.49,0.398-8.964,0.396c-1.023,0-2.012,0.006-2.959,0.006c-3.838,0.014-6.996-0.145-8.941-1.021  c-1.892-0.896-2.907-2.1-3.138-5.529c-0.633-4.861-0.084-14.223-0.084-14.223l-1.704,12.412l0.096,0.062  c-0.678-0.256-1.404-0.43-2.119-0.648c-0.336-0.096-0.653-0.195-0.897-0.279c0.075-9.742,1.879-17.783,7.468-21.961  c0.987,0.619,2.03,1.158,3.112,1.621c0.107,0.699,0.396,1.818,1.188,2.988c1.221,1.848,3.787,3.568,8.043,3.539h0.125  c4.122,0,6.627-1.768,7.793-3.646c0.728-1.148,1.012-2.248,1.125-2.986c1.124-0.5,2.201-1.09,3.22-1.76  c2.872,2.031,4.667,4.93,5.806,8.623c1.181,3.852,1.58,8.521,1.61,13.592C80.702,70.329,79.875,70.554,79.141,70.78z M61.883,46.089  c7.386-0.018,12.067-5.097,12.127-5.147c0.259-0.283,0.244-0.723-0.037-0.986c-0.283-0.261-0.723-0.245-0.986,0.037  c0,0-0.251,0.275-0.767,0.715c-1.548,1.329-5.308,3.995-10.34,3.987c-3.385,0-6.232-1-8.234-2.006  c-0.999-0.504-1.788-1.004-2.319-1.379c-0.533-0.372-0.794-0.604-0.795-0.604c-0.291-0.254-0.73-0.225-0.984,0.066  c-0.254,0.288-0.223,0.728,0.066,0.983C49.677,41.802,54.551,46.077,61.883,46.089z"
                ></path>
              </g>
              <g
                id="SvgjsG1565"
                transform="matrix(2.5810110430221016,0,0,2.5810110430221016,55.26675037217032,34.89824883032184)"
                fill="#5b7327"
              >
                <path d="M8.76 13.84 c0.04 -0.12 0.12 -0.24 0.28 -0.24 l4.96 0 c0.16 0 0.24 0.12 0.28 0.24 l6.92 25.72 c0.04 0.24 -0.12 0.44 -0.36 0.44 l-4.56 0 c-0.12 0 -0.24 -0.08 -0.28 -0.24 l-1.56 -5.6 l-5.84 0 l-1.52 5.6 c-0.04 0.16 -0.12 0.24 -0.28 0.24 l-4.6 0 c-0.24 0 -0.4 -0.2 -0.36 -0.44 z M9.88 29.2 l3.32 0 l-1.72 -6.04 z M16.04 31.560000000000002 l1.84 6 c0.08 0.24 0.52 0.2 0.4 -0.12 l-6.4 -21.28 c-0.12 -0.52 -0.8 -0.56 -0.92 0 l-6.2 21.28 c-0.12 0.28 0.32 0.4 0.44 0.16 l1.76 -6.04 l9.08 0 z M7.08 31.04 l4.36 -14.72 l4.44 14.72 l-8.8 0 z"></path>
              </g>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
