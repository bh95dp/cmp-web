<template>
  <div class="loader">
    <div :class="['loader-dot', setColor]" />
    <div :class="['loader-dot', setColor]" />
    <div :class="['loader-dot', setColor]" />
    <div :class="['loader-dot', setColor]" />
    <div :class="['loader-dot', setColor]" />
    <div :class="['loader-dot', setColor]" />
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "white",
    },
  },
  computed: {
    setColor() {
      return this.color === "white" ? "white" : "primary";
    },
  },
};
</script>

<style>
.loader {
  width: 1rem;
  height: 1rem;
  position: relative;
  animation: loader 1s infinite linear both;
}

.loader-dot {
  animation: loader-dot 1.5s infinite ease-in-out both;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.loader-dot:before {
  content: "";
  display: block;
  width: 30%;
  height: 30%;
  border-radius: 100%;
  color: white;
  background-color: white;
  animation: loader-dot-before 1.5s infinite ease-in-out both;
}

.white:before {
  color: white;
  background-color: white;
}

.primary:before {
  color: #990f3d;
  background-color: #990f3d;
}

.loader-dot:nth-child(1) {
  animation-delay: -1.1s;
}
.loader-dot:nth-child(2) {
  animation-delay: -1s;
}
.loader-dot:nth-child(3) {
  animation-delay: -0.9s;
}
.loader-dot:nth-child(4) {
  animation-delay: -0.8s;
}
.loader-dot:nth-child(5) {
  animation-delay: -0.7s;
}
.loader-dot:nth-child(6) {
  animation-delay: -0.6s;
}
.loader-dot:nth-child(1):before {
  animation-delay: -1.1s;
}
.loader-dot:nth-child(2):before {
  animation-delay: -1s;
}
.loader-dot:nth-child(3):before {
  animation-delay: -0.9s;
}
.loader-dot:nth-child(4):before {
  animation-delay: -0.8s;
}
.loader-dot:nth-child(5):before {
  animation-delay: -0.7s;
}
.loader-dot:nth-child(6):before {
  animation-delay: -0.6s;
}

@keyframes loader {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-dot {
  80%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-dot-before {
  50% {
    transform: scale(0.4);
  }
  100%,
  0% {
    transform: scale(1);
  }
}
</style>