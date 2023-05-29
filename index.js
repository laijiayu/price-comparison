let cropData = []
const showList = document.querySelector(".showList")
const buttonGroup = document.querySelector(".button-group")

// get API data
const getCropData = () => {
  axios
    .get("https://hexschool.github.io/js-filter-data/data.json")
    .then((response) => {
      cropData = response.data
      //   console.log(cropData)
    })
    .catch((error) => {
      console.log(error)
    })
}
getCropData()

//渲染資料
let renderCropData = (showData) => {
  str = ""
  showData.forEach((item) => {
    str += `<tr>
              <td>${item.作物名稱}</td>
              <td>${item.市場名稱}</td>
              <td>${item.上價}</td>
              <td>${item.中價}</td>
              <td>${item.下價}</td>
              <td>${item.平均價}</td>
              <td>${item.交易量}</td>
            </tr>`
  })
  showList.innerHTML = str
}
renderCropData(cropData)

//切換tab篩選資料
buttonGroup.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    const btnDataType = e.target.dataset.type
    if (btnDataType === "N04") {
      tabFilterData = cropData.filter((item) => item.種類代碼 === "N04")
    } else if (btnDataType === "N05") {
      tabFilterData = cropData.filter((item) => item.種類代碼 === "N05")
    } else if (btnDataType === "N06") {
      tabFilterData = cropData.filter((item) => item.種類代碼 === "N06")
    }
    renderCropData(tabFilterData)
  }
})

//search feature

const searchBtn = document.querySelector(".search")
const searchInput = document.querySelector("#crop")

let searchFunction = (e) => {
  if (e.type === "keyup" && e.key !== "Enter") {
    return
  }

  if (e.target.nodeName === "BUTTON" && searchInput.value === "") {
    alert("請勿留空")
  }

  let searchData = []
  searchData = cropData.filter(
    (item) => item.作物名稱 && item.作物名稱.includes(searchInput.value)
  )

  searchInput.value = ""
  if (searchData.length === 0) {
    alert("查不到相關作物名稱")
  }

  renderCropData(searchData)
}

searchBtn.addEventListener("click", searchFunction)
searchInput.addEventListener("keyup", searchFunction)

//篩選
const select = document.getElementById("js-select")
console.log(select)
select.addEventListener("change", (e) => {
  switch (e.target.value) {
    case "依上價排序":
      sortCropData("上價")
      break
    case "依中價排序":
      sortCropData("中價")
      break
    case "依下價排序":
      sortCropData("下價")
      break
    case "依平均價排序":
      sortCropData("平均價")
      break
    case "依交易量排序":
      sortCropData("交易量")
      break
    default:
  }
})

let sortCropData = (value) => {
  cropData.sort((a, b) => {
    return b[value] - a[value]
  })
  renderCropData(cropData)
}

//排序優化
const sortAdvanced = document.querySelector(".js-sort-advanced")

sortAdvanced.addEventListener("click", (e) => {
  if (e.target.nodeName !== "I") {
    return
  }
  const sortDirection = e.target.dataset.sort === "down" ? -1 : 1
  const sortProperty = e.target.dataset.price

  cropData.sort((a, b) => sortDirection * (a[sortProperty] - b[sortProperty]))

  renderCropData(cropData)
})
