export default function sticky(node, { stickToTop }) {
  const sentinelStyle = "position: absolute; height: 1px;";
  const stickySentinelTop = document.createElement("div");
  stickySentinelTop.classList.add("stickySentinelTop");
  stickySentinelTop.style = sentinelStyle;

  node.parentNode.prepend(stickySentinelTop);

  // watch intersection
  const intersectionCallback = function (entries) {
    const entry = entries[0];
    let isStuck = !entry.isIntersecting;

    node.dispatchEvent(
      new CustomEvent("stuck", {
        detail: { isStuck },
      })
    );
  };

  const intersectionObserver = new IntersectionObserver(
    intersectionCallback,
    {}
  );
  intersectionObserver.observe(stickySentinelTop);

  return {
    destroy() {
      intersectionObserver.disconnect();
    },
  };
}
