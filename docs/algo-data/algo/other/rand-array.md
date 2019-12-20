# 随机产生[start,n)的不重复数组

## 前提
* 时间复杂度T(n)=O(n)
* 空间复杂度S(n)=O(n)

## 示例代码
```go
func RandSlice(start, n int) []int {
	result := make([]int, n)

	randObj := rand.New(rand.NewSource(time.Now().Unix()))
	for i := 0; i < n; i++ {
		randNum := randObj.Intn(i + 1)
		result[i], result[randNum] = result[randNum], i
	}

	if start != 0 {
		for i := 0; i < n; i++ {
			result[i] += start
		}
	}

	return result
}
```
[完整代码](https://github.com/wshhz/algoAndData/blob/master/algo/other/randSlice.go)