export const fillFormWithSampleValues = (valueByFieldName: Record<string, string>) => {
  for (const fieldName in valueByFieldName) {
    document.querySelector(`[name='${fieldName}']`)?.setAttribute("value", valueByFieldName[fieldName])
  }
}
