<template>
	<section>
		<table>
			<thead>
			<tr>
				<th>#</th>
				<th>Сумма</th>
				<th>Дата</th>
				<th>Категория</th>
				<th>Тип</th>
				<th>Открыть</th>
			</tr>
			</thead>

			<tbody>
			<tr v-for="(record, idx) of records" v-bind:key="record.id">
				<td>{{idx+1}}</td>
				<td>{{record.amount | currency('UAH')}}</td>
				<td>{{record.dateCreated |date('datetime')}}</td>
				<td>{{record.categoryName}}</td>
				<td>
					<span class="white-text badge" v-bind:class="[record.typeClass]">{{record.typeText}}</span>
				</td>
				<td>
					<button class="btn-small btn" v-on:click="$router.push('/detail/'+record.id)">
						<i class="material-icons">open_in_new</i>
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
