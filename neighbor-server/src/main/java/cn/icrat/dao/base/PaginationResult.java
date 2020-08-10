package cn.icrat.dao.base;
import java.util.List;

public class PaginationResult {
    private int pageSize;
    private int pageIndex;
    private int totalCount;
    private List items;

    public PaginationResult() {
    }

    public PaginationResult(int pageIndex, int pageSize, int totalCount, List items) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.items = items;
        this.totalCount = totalCount;
    }

    public int getPageSize() {
        return this.pageSize;
    }

    public int getPageIndex() {
        return this.pageIndex;
    }

    public int getTotalCount() {
        return this.totalCount;
    }

    public List getItems() {
        return this.items;
    }

    public int getMaxPageCount() {
        int maxPageCount = this.totalCount / this.pageSize;
        if (this.totalCount % this.pageSize > 0) {
            ++maxPageCount;
        }

        return maxPageCount;
    }
}
