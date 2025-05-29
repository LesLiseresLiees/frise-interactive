let data = [];

function addElement() {
  const type = document.getElementById("type").value;
  const name = document.getElementById("name").value;
  const start = parseInt(document.getElementById("start").value);
  const end = parseInt(document.getElementById("end").value);
  const color = document.getElementById("color").value;

  if (!name || isNaN(start)) {
    alert("Nom et date de début obligatoires !");
    return;
  }

  const element = { type, name, start, color };
  if (!isNaN(end)) element.end = end;

  data.push(element);
  drawTimeline();
}

function drawTimeline() {
  const container = document.getElementById("timeline");
  container.innerHTML = "";

  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "timeline-item";
    div.textContent = item.name;
    div.style.background = item.color;
    div.style.position = "absolute";
    div.style.left = (item.start - 1900) * 10 + "px";
    div.style.top = item.type === "period" ? "50px" :
                    item.type === "life" ? "150px" : "0px";
    div.style.width = item.end ? ((item.end - item.start) * 10) + "px" : "10px";
    div.style.height = "30px";
    container.appendChild(div);
  });
}

function saveJSON() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "frise.json";
  a.click();
}

function loadJSON(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = e => {
    data = JSON.parse(e.target.result);
    drawTimeline();
  };
  reader.readAsText(file);
}
