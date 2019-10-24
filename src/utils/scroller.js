export const scrollTop = function() {
  window.scrollTo(0, 0);
};

export const scrollBottom = function() {
  const body = document.getElementById("content-body");
  window.scrollTo({ top: body.scrollHeight, left: 0, behavior: "smooth" });
};