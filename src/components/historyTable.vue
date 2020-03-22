<template>
	<section>
		<table>
			<thead>
			<tr>
				<th>#</th>
				<th>Сумма</th>
				<th>Дата</th>
				<th>Кат</th>
				<th>Открыть</th>
			</tr>
			</thead>

			<tbody>
			<tr v-for="(record, idx) of records" v-bind:key="record.id">
				<td>{{(($route.query.page || 1) * 5)+idx-4}}</td>
				<td>{{record.amount | currency('UAH')}}</td>
				<td>{{record.dateCreated |date('date')}}</td>
				<td>{{record.categoryName}}</td>
				<td>
					<button class="btn-small btn" v-on:click="$router.push('/detail/'+record.id)" v-bind:class="[record.typeClass]">
						{{record.typeText}}<i class="material-icons">open_in_new</i>
					</button>
				</td>
			</tr>
			</tbody>
		</table>
	</section>
</template>

<script>
export default {
  name: 'historyTable',
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
