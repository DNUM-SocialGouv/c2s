package fr.gouv.sante.c2s.web.model.response;

import java.util.List;
public class PageableCountDTO<T> {

    List<T> list;
    Long count;

    public PageableCountDTO() {

    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}
