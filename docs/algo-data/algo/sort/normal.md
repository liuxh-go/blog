# 常见排序算法

## 一、冒泡排序

### 思路

冒泡排序的思路很简单,就是两两挨个比较,把较小或较大的数交换到前面去,这样经历过几轮循环后,数组中小的数或者大的数就会“浮”到前面去,达到数组有序的效果

### 排序过程(以升序即从小到大顺序排列)

0. 初始化n为0
1. 第n个数和第n+1个数进行比较,如果第n+1个数小于第n个数,那么把第n个数和第n+1个数进行交换
2. 递增n(即n加1),重复`1`步骤直到遍历完整个数组
3. 根据数组长度重复`0`步骤(长度为l则重复l次)
4. 完成排序

### 示例代码

```go
func (this *Bubble) Sort() {
	data := this.data
	l := len(data)
	for i := 0; i < l; i++ {
		for j := 0; j < l-1; j++ {
			if data[j+1] < data[j] {
				data[j], data[j+1] = data[j+1], data[j]
			}
		}
	}
}
```
[完整代码](https://github.com/wshhz/algoAndData/blob/master/algo/sort/bubble.go)

### 性能分析

* 稳定排序
* 内排序
* 冒泡排序不需要使用额外的空间,所以空间复杂度为S(n)=O(1)
* 当数组本来就是有序的时候,此时为最好情况T(n)=O(n),最坏T(n)=O(n^2),平均情况T(n)=O(n^2)

## 二、选择排序

### 思路

选择排序其实和冒泡排序有点像,只是不是挨个比较交换;选择排序把待排序序列分为了有序序列和无序序列两个部分,循环的从无序序列从选出最小或最大的数放到有序序列中,当无序序列选择完毕时有序序列就是排序之后的序列

### 排序过程(以升序即从小到大顺序排列)

0. 初始化i=0
1. 划分有序序列R[0,i]和无序序列R[i+1,n],R为待排序序列
2. 从无序序列R[i+1,n]中选出最小的数,下标为min,将R[min]和R[i]进行交换
3. i增加1,继续步骤`2`直到i=n
4. 完成排序
   
### 示例代码

```go
func (this *Select) Sort() {
	data := this.data
	l := len(data)
	for i := 0; i < l-1; i++ {
		min := i
		for j := i; j < l; j++ {
			if data[j] < data[min] {
				min = j
			}
		}

		data[min], data[i] = data[i], data[min]
	}
}
```
[完整代码](https://github.com/wshhz/algoAndData/blob/master/algo/sort/select.go)

### 性能分析

* 稳定排序
* 内排序
* 选择排序使用常数级的额外空间,所以空间复杂度为S(n)=O(1)
* 最好情况T(n)=O(n^2),最坏T(n)=O(n^2),平均情况T(n)=O(n^2)


## 三、插入排序

### 思路

插入排序和选择排序有点类似,开始都需要将待排序序列划分为有序序列和无序序列,区别在于插入排序是依次的从无序序列中取出元素,然后从后向前依次遍历有序序列,找到该元素应该插入的位置,最终完成整个序列的排序

### 排序过程(以升序即从小到大顺序排列)

0. 取出R[0],默认为有序序列,初始化n=1
1. 取出R[n],将R[n]循环和R[0,n)中的元素比较,若R[n]大于比较的元素,则将R[n]插入在比较元素的下一个位置
2. n增加1,重复`1`步骤直到遍历完整个序列
3. 完成排序

### 示例代码

```go
func (this *Insert) Sort() {
	data, l := this.data, len(this.data)

	for i := 1; i < l; i++ {
		for j := i; j > 0; j-- {
			if data[j] < data[j-1] {
				data[j], data[j-1] = data[j-1], data[j]
			} else {
				break
			}
		}
	}
}
```
[完整代码](https://github.com/wshhz/algoAndData/blob/master/algo/sort/insert.go)

### 性能分析

* 稳定排序
* 内排序
* 插入排序使用常数级的额外空间,所以空间复杂度为S(n)=O(1)
* 最好情况T(n)=O(n),最坏T(n)=O(n^2),平均情况T(n)=O(n^2)

## 四、希尔排序

### 思路

希尔排序是改进的插入排序,核心思想是把待排序序列按照一个增量拆分成几组小序列,分别对小序列进行插入排序,然后减少增量,重复该过程直到增量为1,最终序列有序的效果

### 排序过程(以升序即从小到大顺序排列)

0. 选择增量序列,一般选择gap=length/2,gap/2,gap/4...
1. 按照增量拆分待排序序列,对每组序列分别进行插入排序
2. 选择下一个增量,重复`1`过程直到增量为1
3. 完成排序

### 示例代码
```go
func (this *Hill) Sort() {
	data, l := this.data, len(this.data)

	for gap := l / 2; gap > 0; gap /= 2 {
		insertSort(data, gap, l/gap)
	}
}

func insertSort(data []int, gap, count int) {
	for i := gap; i < count; i += gap {
		for j := i; j > 0; j -= gap {
			if data[j] < data[j-gap] {
				data[j], data[j-gap] = data[j-gap], data[j]
			} else {
				break
			}
		}
	}
}
```
[完整代码](https://github.com/wshhz/algoAndData/blob/master/algo/sort/hill.go)

### 性能分析

* 不稳定排序
* 内排序
* 插入排序使用常数级的额外空间,所以空间复杂度为S(n)=O(1)
* 最好情况T(n)=O(nlog^2n ),最坏T(n)=O(nlog^2n),平均情况T(n)=O(nlogn)

## 五、快速排序

### 思路

每次选择一个基准值,然后根据基准值将待排序序列分成比基准值小和比基准值大的两个序列,再递归的对这两个子序列进行快速排序,最终完成整个序列的排序

### 排序过程(以升序即从小到大顺序排列)

0. 分区:从序列中选出一个关键字作为基准值,遍历序列,将比基准值小的项全部放到基准值左边,比基准值大的项放到右边
1. 将`0`步骤得到的左分区和右分区序列递归的再进行`0`步骤的操作,直到分区长度为1
2. 完成排序

### 示例代码

```go
func (this *Quick) Sort() {
	quickSort(this.data, 0, len(this.data))
}

func quickSort(data []int, start, end int) {
	if end <= start {
		return
	}

	index := partition(data, start, end)

	// 递归排序左右分区
	quickSort(data, start, index)
	quickSort(data, index+1, end)
}

func partition(data []int, start, end int) int {
	// 将比基准值小的项都放到左边
	benchmarkValue := data[start]
	for i := start + 1; i < end; i++ {
		if data[i] > benchmarkValue {
			continue
		}

		j := i - 1
		for ; j > start; j-- {
			if data[j] <= benchmarkValue {
				break
			}
		}

		data[i], data[j+1] = data[j+1], data[i]
	}

	// 找到基准值应该在的位置
	index := start
	for ; index < end; index++ {
		if data[index] > benchmarkValue {
			break
		}
	}
	data[start], data[index-1] = data[index-1], data[start]

	return index - 1
}
```
[完整代码](https://github.com/wshhz/algoAndData/blob/master/algo/sort/quick.go)

### 性能分析

* 不稳定排序
* 内排序
* 快速排序虽然是在原地进行的排序,但递归调用会消耗额外但内存空间,S(n)=O(logn)
* 最好情况T(n)=O(nlogn),最坏T(n)=O(n^2),平均情况T(n)=O(nlogn)


## 六、归并排序

### 思路

归并排序采用分治法,先将待排序序列拆分成小序列,分别对小序列进行排序后合并小序列为大序列,最终合并成完整的有序序列

### 排序过程(以升序即从小到大顺序排列)

0. 将长度为n的序列拆分为两个长度为n/2的序列
1. 分别对长度为n/2的序列进行排序
2. 将排序后的两个序列进行合并得到长度为n的有序序列
3. 递归从`0`步骤开始调用,直到序列无法拆分为止
4. 完成排序

### 示例代码

```go
func (this *Merge) Sort() {
	this.data = mergeSort(this.data)
}

func mergeSort(slice []int) []int {
	l := len(slice)
	if l < 2 {
		return slice
	}

	return merge(mergeSort(slice[:l/2]), mergeSort(slice[l/2:]))
}

// 合并有序数组
func merge(sliceOne, sliceTwo []int) []int {
	totalLen := len(sliceOne) + len(sliceTwo)
	result := make([]int, totalLen)
	for i, j, k := 0, 0, 0; k < totalLen; k++ {
		if i >= len(sliceOne) {
			result[k] = sliceTwo[j]
			j++
		} else if j >= len(sliceTwo) {
			result[k] = sliceOne[i]
			i++
		} else if sliceOne[i] < sliceTwo[j] {
			result[k] = sliceOne[i]
			i++
		} else {
			result[k] = sliceTwo[j]
			j++
		}
	}

	return result
}
```
[完整代码](https://github.com/wshhz/algoAndData/blob/master/algo/sort/merge.go)

### 性能分析

* 稳定排序
* 内排序
* 归并排序需要使用额外的辅助数组,所以空间复杂度为S(n)=O(n)
* 最好情况T(n)=O(nlogn ),最坏T(n)=O(nlogn),平均情况T(n)=O(nlogn)

## 七、堆排序

### 思路

使用堆积的特性(根节点的值大于或小于任一子节点的值),将待排序序列构建成堆,然后依次取出堆顶的值,最终得到一个有序的序列

### 排序过程(以升序即从小到大顺序排列)

0. 将待排序序列构建成一个堆,初始化i=0
1. 将R[i,n)调整为小顶堆,此时R[0,i)为有序区,R[i,n)为无序区
2. i增加1,从`1`步骤重复,直到i=n
3. 完成排序

### 示例代码

```go
func (this *Heap) Sort() {
	for i := 0; i < len(this.data); i++ {
		this.adjustHeap(i)
	}
}

func (this *Heap) adjustHeap(start int) {
	data := this.data[start:]
	l := len(data)
	if l <= 0 {
		return
	}

	// 小顶堆:满足公式 R[i] < R[2*i+1] && R[i] < R[2*i+2]
	for i := l/2 - 1; i >= 0; i-- {
		minIndex := i

		if 2*i+1 < l && data[2*i+1] < data[minIndex] {
			minIndex = 2*i + 1
		}

		if 2*i+2 < l && data[2*i+2] < data[minIndex] {
			minIndex = 2*i + 2
		}

		if minIndex != i {
			data[i], data[minIndex] = data[minIndex], data[i]
		}
	}
}
```
[完整代码](https://github.com/wshhz/algoAndData/blob/master/algo/sort/heap.go)

### 性能分析

* 不稳定排序
* 内排序
* 堆排序使用常数级的额外空间,所以空间复杂度为S(n)=O(1)
* 最好情况T(n)=O(nlogn ),最坏T(n)=O(nlogn),平均情况T(n)=O(nlogn)

## 八、计数排序

### 思路

计数排序的思路比较简单,就是统计序列中每个数出现的次数,然后用一个辅助数组存储统计,直到统计完序列;再从辅助中依次取出存入的数,最终完成排序

### 排序过程(以升序即从小到大顺序排列)

0. 找出待排序序列中最小(Min)和最大的数(Max)
1. 构建辅助数组F[0,Max-Min],初始化i=0
2. 统计,F[R[i]-Min]++
3. i增加1,从`2`步骤重复直到i=n
4. 遍历F[0,Max-Min],填充结果数组
5. 完成排序

### 示例代码

```go
func (this *Count) Sort() {
	data := this.data
	min, max := data[0], data[0]
	for _, item := range data[1:] {
		if item < min {
			min = item
		}

		if item > max {
			max = item
		}
	}

	f := make([]int, max-min+1)
	for _, item := range data {
		f[item-min]++
	}

	for index, i := 0, 0; i < len(f); {
		if f[i] <= 0 {
			i++
			continue
		}

		data[index] = i + min
		index++
		f[i]--
	}
}
```
[完整代码](https://github.com/wshhz/algoAndData/blob/master/algo/sort/count.go)

### 性能分析

* 稳定排序
* 内排序
* 假设待排序序列的最大数减去最小数的差为k
* 计数排序需要使用额外的辅助数组,所以空间复杂度为S(n)=O(k)
* 最好情况T(n)=O(n+k),最坏T(n)=O(n+k),平均情况T(n)=O(n+k)

## 九、桶排序

### 思路

桶排序的思路和计数排序有点类似,只是桶排序是划分一定个数的桶,将待排序的序列中的数据按照一个映射函数放置到对应的桶中,再依次对非空的桶中的元素进行桶排序或其他排序,最终依次从桶中取出数据得到有序序列

### 排序过程(以升序即从小到大顺序排列)

0. 初始化桶的大小为size
1. 找到待排序序列R[0,n)中的最小数Min和最大数Max,计算桶的个数为(Max-Min)/size+1
2. 遍历R[0,n),根据映射函数将R[i]填入对应的桶中
3. 遍历每个桶,如果桶的size为1,将桶中元素添加到结果序列中
4. 如果桶的个数为1但桶的size大于1,则将size减1
5. 递归调用`1`步骤将非空桶中的序列作为待排序序列继续进行分配
6. 结果序列即为排序后的序列

### 示例代码

```go
func (this *Barrel) Sort() {
	this.data = barrelSort(this.data, 10)
}

func barrelSort(data []int, barrelSize int) []int {
	if data == nil || len(data) <= 1 {
		return data
	}

	min, max := data[0], data[0]
	for _, item := range data {
		if item < min {
			min = item
		}

		if item > max {
			max = item
		}
	}

	barrelCount := (max-min)/barrelSize + 1
	barrelSlice := make([][]int, barrelCount)
	resultSlice := make([]int, 0)

	// 填充桶
	for _, item := range data {
		barrelIndex := (item - min) / barrelSize
		barrelSlice[barrelIndex] = append(barrelSlice[barrelIndex], item)
	}

	for i := 0; i < barrelCount; i++ {
		if barrelSize == 1 {
			resultSlice = append(resultSlice, barrelSlice[i]...)
			continue
		}

		if barrelCount == 1 {
			barrelSize--
		}

		resultSlice = append(resultSlice, barrelSort(barrelSlice[i], barrelSize)...)
	}

	return resultSlice
}
```
[完整代码](https://github.com/wshhz/algoAndData/blob/master/algo/sort/barrel.go)

### 性能分析

* 稳定排序
* 内排序
* 假设桶的个数为k
* 桶排序需要使用额外的辅助数组,所以空间复杂度为S(n)=O(n+k)
* 最好情况T(n)=O(n+k),最坏T(n)=O(n^2),平均情况T(n)=O(n+k)

## 十、基数排序

### 思路

基数排序的思路很清晰,就是从数字的低位开始比较,小的放前面,然后再从下一位开始比较,直到比较到最高位就能完成排序

### 排序过程(以升序即从小到大顺序排列)

0. 找到最大的数Max,计算Max的位数为Digit,初始化辅助数组F[0,10),初始化i=1
1. 遍历待排序序列,计算对应位的数R[d]=R[i]%10^i/10^(i-1),根据R[d]将数字填入辅助数组中F[R[d]]=R[i]
2. 遍历辅助数组F[0,10),依次取出数字放入临时数组
3. i增加1,将临时数组传入`1`步骤重复直到i=Digit
4. 最后得到的临时数组即为排序好的序列

### 示例代码

```go
func (this *Base) Sort() {
	data := this.data
	max := data[0]
	for _, item := range data {
		if item > max {
			max = item
		}
	}

	digit := 0
	for max > 0 {
		max /= 10
		digit++
	}

	for i := 1; i <= digit; i++ {
		f := make([][]int, 10)
		// 填充辅助数组
		for _, item := range data {
			index := (item % int(math.Pow10(i))) / int(math.Pow10(i-1))
			f[index] = append(f[index], item)
		}

		// 从辅助数组中取出数字替换data
		for dataIndex, j := 0, 0; j < 10; j++ {
			if f[j] == nil || len(f[j]) <= 0 {
				continue
			}

			for k := 0; k < len(f[j]); k++ {
				data[dataIndex] = f[j][k]
				dataIndex++
			}
		}
	}
}
```
[完整代码](https://github.com/wshhz/algoAndData/blob/master/algo/sort/base.go)

### 性能分析

* 稳定排序
* 内排序
* 假设待排序序列的最大位数为k
* 基数排序需要使用额外的辅助数组,所以空间复杂度为S(n)=O(n+k)
* 最好情况T(n)=O(n*k),最坏T(n)=O(n*k),平均情况T(n)=O(n*k)

## 十一、常见排序算法总结

* 冒泡排序、选择排序、插入排序、希尔排序相对比较简单,理解起来也很容易,但效率不是很高
* 快速排序和归并排序思路有点类似,都是采取分治法将问题拆分为小问题,在解决了小问题后再将其合并,但递归算法相对有一定的难度,不是很好理解
* 堆排序比较特殊,采用了堆这种特殊的数据结构的特性,只要能理解堆的结构,算法就很好理解了
* 计数排序、桶排序、基数排序核心思想差不多,都是采用辅助数组根据一定的规则来保存待排序序列,再从辅助数组中依次取出数据,完成排序,只要稍微研究一下,就能理解三个算法
* [完整项目代码地址](https://github.com/wshhz/algoAndData/tree/master/algo/sort)