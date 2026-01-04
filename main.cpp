using swap_fn = void (*)(void *, int const, int const);
using compare_fn = bool (*)(void *, int const, int const);

int partition(void *arr, int const low, int const high, compare_fn fcomp, swap_fn fswap)
{
    int i = low - 1;

    for (int j = low; j <= high - 1; j++)
    {
        if (fcomp(arr, j, high))
        {
            i++;
            fswap(arr, i, j);
        }
    }
    fswap(arr, i + 1, high);

    return i + 1;
}

void quicksort(void *arr, int const low, int const high, compare_fn fcomp, swap_fn fswap)
{
    if (low < high)
    {
        int const pi = partition(arr, low, high, fcomp, fswap);
        quicksort(arr, low, pi - 1, fcomp, fswap);
        quicksort(arr, pi + 1, high, fcomp, fswap);
    }
}

void swap_int(void *arr, int const i, int const j)
{
    int *iarr = (int *)arr;
    int t = iarr[i];
    iarr[i] = iarr[j];
    iarr[j] = t;
}

bool less_int(void *arr, int const i, int const j)
{
    int *iarr = (int *)arr;
    return iarr[i] <= iarr[j];
}

int main()
{
    int arr[] = {13, 1, 8, 3, 5, 2, 1};
    int n = sizeof(arr) / sizeof(arr[0]);
    quicksort(arr, 0, n - 1, less_int, swap_int);
}