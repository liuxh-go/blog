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

## 三、快速排序

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

## 四、插入排序

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

## 五、希尔排序

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

## 六、桶排序

### 思路

// TODO

### 排序过程(以升序即从小到大顺序排列)

// TODO

### 示例代码

// TODO

### 性能分析

// TODO

## 七、基数排序

### 思路

// TODO

### 排序过程(以升序即从小到大顺序排列)

// TODO

### 示例代码

// TODO

### 性能分析

// TODO

## 八、归并排序

### 思路

// TODO

### 排序过程(以升序即从小到大顺序排列)

// TODO

### 示例代码

// TODO

### 性能分析

// TODO

## 九、计数排序

### 思路

// TODO

### 排序过程(以升序即从小到大顺序排列)

// TODO

### 示例代码

// TODO

### 性能分析

// TODO

## 十、堆排序

### 思路

// TODO

### 排序过程(以升序即从小到大顺序排列)

// TODO

### 示例代码

// TODO

### 性能分析

// TODO