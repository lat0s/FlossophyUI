<template>
  <BContainer id="homebg" fluid>
    <BRow>
      <BCol md="6" class="text-container">
        <h1 id="title">FLOSSOPHY</h1>
        <div id="content">
          <p class="highlight">Seamless Dental Booking</p>
          <p>
            Discover the convenience of our
            <span class="accent-color">all-in-one dental booking solution</span
            >. Quick, easy, and completely stress-free.
          </p>
          <p>
            Book your dental appointments with
            <span class="accent-color">confidence and ease</span>, ensuring your
            dental health is always in top shape.
          </p>
        </div>
      </BCol>
      <BCol md="6" class="image-container">
        <img id="bgimg" src="../assets/welcomhero.png" />
      </BCol>
    </BRow>
  </BContainer>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');

  .text-container {
    position: relative;
    padding: 4rem;
    background: linear-gradient(
      135deg,
      #dbebff,
      #f1f9ff
    ); /* Light gradient background */
  }

  #title {
    font-family: 'Abel', sans-serif;
    font-size: 5rem; /* Increased font size */
    color: #333;
    font-weight: bold; /* Make it bold */
    margin-bottom: 1rem;
  }

  #content p {
    font-family: 'Abel', sans-serif;
    color: #333;
    font-size: 1.5rem; /* Slightly larger font size */
    line-height: 1.7; /* More breathable line height */
    font-weight: 500; /* Semi-bold for the content */
    margin-bottom: 1rem; /* Space between paragraphs */
  }

  .highlight {
    font-size: 2rem;
    font-weight: 700; /* Even bolder for highlights */
    color: #6c63ff; /* A soft purple for highlights */
  }

  .accent-color {
    color: #ff63a5; /* A pinkish tone for important text parts */
  }
  #footer {
    position: relative;
    top: 10vh !important;
  }
  #homebg {
    background-color: rgba(203, 160, 243, 0.849) !important;
    height: 100%;
    width: 100%;
  }

  .image-container {
    display: flex;
    justify-content: center;
    align-items: center; /* Center image vertically and horizontally */
  }

  #bgimg {
    max-width: 100%;
    height: auto;
    max-height: 80vh; /* Set a max-height for large screens, vh units for responsiveness */
  }

  @media screen and (max-width: 992px) {
    /* Adjusting for medium screens */
    .text-container {
      padding: 2rem;
    }
    #title {
      font-size: 4rem;
    }
    .highlight {
      font-size: 1.8rem;
    }
    #content p {
      font-size: 1.2rem;
    }
  }

  @media screen and (max-width: 768px) {
    /* Adjusting for small screens */
    .text-container {
      padding: 1rem;
    }
    #title {
      font-size: 3rem;
    }
    .highlight {
      font-size: 1.5rem;
    }
    #content p {
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 576px) {
    /* Adjusting for extra small screens */
    .text-container {
      padding: 0.5rem;
    }
    #title {
      font-size: 2.5rem;
    }
    .highlight {
      font-size: 1.3rem;
    }
    #content p {
      font-size: 0.9rem;
    }
    #bgimg {
      max-height: 50vh;
    }
  }
</style>
