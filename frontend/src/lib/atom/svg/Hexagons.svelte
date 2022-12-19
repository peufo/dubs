

    export let index = 0
    export let maxShowDelay = 0
    export let stepDelay = 15
  
  
  export let sides?: HexagonProps[]

  function getMaxDeep(sides?: HexagonProps[], count = 0): number {
    if (!sides || !sides.length) return count
    let counts: number[] = Array(sides.length).fill(count)
    sides.forEach((side, index) => {
      counts[index] += getMaxDeep(side.sides, index + 1)
    })
    return Math.max(...counts)
  }

  function getMaxShowDelay() {
    const maxDeep = getMaxDeep(props.sides)
    return maxDeep * stepDelay
  }

  const index = props.index || 0
  const showDelay = stepDelay * index
  const maxShowDelay = props.maxShowDelay || getMaxShowDelay()
  const hideDelay = maxShowDelay - showDelay

        <For each={props.sides}>
        {(side, sideIndex) => (
          <Hexagon
            {...side}
            origin={origin}
            visible={side.visible}
            open={props.open}
            gap={props.gap}
            index={(props.index || 0) + sideIndex() + 1}
            maxShowDelay={maxShowDelay}
          />
        )}
      </For>