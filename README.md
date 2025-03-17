<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/lat0s/FlossophyUI">
    <img src="assets/flossophy.png" alt="Logo" width="256" height="256">
  </a>

<h3 align="center">Flossophy User Interface</h3>

#

<h3>❗ STILL WIP FEW ISSUES EXIST ❗</h3>

#

  <p align="center">
    🪥 A modern dental care application interface built with Vue.js and BootstrapVue Next.
    <br />
    <a href="https://github.com/lat0s/FlossophyUI"><strong>Explore the docs (!WIP!) »</strong></a>
    <br />
    <br />
    <a href="https://github.com/lat0s/FlossophyUI">View Demo (!WIP!)</a>
    ·
    <a href="https://github.com/lat0s/FlossophyUI/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/lat0s/FlossophyUI/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

---

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

---

<!-- ABOUT THE PROJECT -->

## About The Project

### Attention ⚠️ It won't work without additional configuration and an API, unless you use [this one](https://github.com/lat0s/FlossophyREST) i made specifically for Flossophy if you want to test everything.
Flossophy User Interface is the frontend of a modern dental care application. It allows patients to:

- Register / Login.
- Map view of available dental clinics in your area.
- Reactive view of appointments
  - Meaning the calendar displays changes to appointments in real-time. 
- Book and cancel appointments
  - When appointments are booked or cancelled an email is sent to both the patient and the dentist assosciated.


The UI is built with **Vue.js 3** and **BootstrapVue Next**, ensuring a smooth and responsive user experience.


---

### Built With

- [![Vue.js][Vue.js]][Vue-url]
- [![Bootstrap][Bootstrap]][Bootstrap-url]
- [![Vite][Vite]][Vite-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- GETTING STARTED -->

## Getting Started

Follow these instructions to set up the Flossophy User Interface locally.

### Prerequisites

- [Node.js](https://nodejs.org/en) Latest Version
- A running **Backend API**.
  - I made one specifically for this project. [Here!](https://github.com/lat0s/FlossophyREST).

### Installation

1. Clone the repo:
```sh
git clone https://github.com/lat0s/FlossophyUI.git
```
2. Navigate to the project directory:
```sh
cd app
```

3. Install dependencies:
```sh
npm install
```
4. Make sure in `vite.config.ts` points to the correct location of the API!!! If nothing goes wrong, and you were to use [this](https://github.com/lat0s/FlossophyREST) it should seamlessly work.
5. Run the development server:
```sh
npm run dev
```

6. Open the application:
```sh
http://localhost:5173
```
 
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## <!-- Footer -->

<p align="center">
<img src="./assets/footer.svg">
</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Nodemailer-url]: https://www.nodemailer.com/
[Mongo]: https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff&style=flat-square
[Mongo-url]: https://www.mongodb.com/
[Node]: https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=fff&style=flat-square
[Node-url]: https://nodejs.org/en
[Koa-url]: https://koajs.com/
[Koa]: https://img.shields.io/badge/Koa-33333D?logo=koa&logoColor=fff&style=flat-square
[contributors-shield]: https://img.shields.io/github/contributors/lat0s/FlossophyUI.svg?style=for-the-badge
[contributors-url]: https://github.com/lat0s/FlossophyUI/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/lat0s/FlossophyUI.svg?style=for-the-badge
[forks-url]: https://github.com/lat0s/FlossophyUI/network/members
[stars-shield]: https://img.shields.io/github/stars/lat0s/FlossophyUI.svg?style=for-the-badge
[stars-url]: https://github.com/lat0s/FlossophyUI/stargazers
[issues-shield]: https://img.shields.io/github/issues/lat0s/FlossophyUI.svg?style=for-the-badge
[issues-url]: https://github.com/lat0s/FlossophyUI/issues
[license-shield]: https://img.shields.io/github/license/lat0s/FlossophyUI.svg?style=for-the-badge
[license-url]: https://github.com/lat0s/FlossophyUI/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/latosgeorge
[product-screenshot]: images/screenshot.png

[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Bootstrap]: https://img.shields.io/badge/Bootstrap-35495E?style=for-the-badge&logo=bootstrap&logoColor=A020F0
[Vite]: https://img.shields.io/badge/Vite-35495E?style=for-the-badge&logo=vite&logoColor=FFFF00
[Bootstrap-url]: https://bootstrap-vue-next.github.io/bootstrap-vue-next/
[Vue-url]: https://vuejs.org/
[Vite-url]: https://vite.dev/
